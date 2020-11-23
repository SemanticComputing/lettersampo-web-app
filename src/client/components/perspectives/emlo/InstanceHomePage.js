import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
import Network from '../../facet_results/Network'
import ApexChart from '../../facet_results/ApexChart'
// import LeafletMap from '../../facet_results/LeafletMap'
import { createMultipleLineChartData, createSignatureLineChartData } from '../../../configs/emlo/ApexCharts/LineChartConfig'
import Export from '../../facet_results/Export'
import { coseLayout, cytoscapeStyle, preprocessEgo, preprocessTie } from '../../../configs/emlo/Cytoscape.js/NetworkConfig'
import { Route, Redirect } from 'react-router-dom'
import { has } from 'lodash'

const styles = () => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    height: 'calc(100% - 72px)',
    overflow: 'auto'
  },
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
 * A component for generating a landing page for a single entity.
 */
class InstanceHomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      localID: null
    }
  }

  componentDidMount = () => this.fetchTableData()

  componentDidUpdate = prevProps => {
    // handle the case when the TABLE tab was not originally active
    const prevPathname = prevProps.routeProps.location.pathname
    const currentPathname = this.props.routeProps.location.pathname
    if (prevPathname !== currentPathname && currentPathname.endsWith('table')) {
      this.fetchTableData()
    }
  }

  fetchTableData = () => {
    let uri = ''
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.tabs.map(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    this.setState({ localID: localID })
    switch (this.props.resultClass) {
      case 'actors':
        uri = `http://ldf.fi/ckcc/actors/${encodeURIComponent(localID)}`
        break
      case 'letters':
        uri = `http://ldf.fi/ckcc/letters/${localID}`
        break
      case 'places':
        uri = `http://ldf.fi/ckcc/places/${encodeURIComponent(localID)}`
        break
      case 'ties':
        uri = `http://ldf.fi/ckcc/ties/${localID}`
        break
    }
    this.props.fetchByURI({
      resultClass: this.props.resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  getVisibleRows = rows => {
    const visibleRows = []
    const instanceClass = this.props.tableData.type ? this.props.tableData.type.id : ''
    rows.map(row => {
      if ((has(row, 'onlyForClass') && row.onlyForClass === instanceClass) ||
       !has(row, 'onlyForClass')) {
        visibleRows.push(row)
      }
    })
    return visibleRows
  }

  render = () => {
    const { classes, tableData, results, isLoading, resultClass, rootUrl } = this.props
    const hasTableData = tableData !== null && Object.values(tableData).length >= 1
    //  console.log(resultClass)
    //  console.log(this.props)
    return (
      <div className={classes.root}>
        <PerspectiveTabs
          routeProps={this.props.routeProps}
          tabs={this.props.tabs}
          screenSize={this.props.screenSize}
        />
        <Paper square className={classes.content}>
          {isLoading &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasTableData &&
            <>
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </>}
          {hasTableData &&
            <>
              <Route
                exact path={`${rootUrl}/${resultClass}/page/${this.state.localID}`}
                render={() => <Redirect to={`${rootUrl}/${resultClass}/page/${this.state.localID}/table`} />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/table`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    data={tableData}
                    properties={this.getVisibleRows(this.props.properties)}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/actorLetters`}
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    resultClassVariant='actorLetters'
                    fetchResultsWhenMounted
                    data={results ? results[0] : null}
                    resultUpdateID={this.props.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    uri={tableData.id}
                    properties={[
                      {
                        id: 'prefLabel',
                        valueType: 'object',
                        makeLink: false,
                        externalLink: false,
                        sortValues: true,
                        numberedList: false,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'alter',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: false,
                        sortValues: false,
                        numberedList: true,
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'measures',
                        valueType: 'string',
                        makeLink: false,
                        externalLink: false,
                        sortValues: false,
                        numberedList: false,
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'num_correspondences',
                        valueType: 'string',
                        makeLink: false,
                        externalLink: false,
                        sortValues: false,
                        numberedList: false,
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'num_sent',
                        valueType: 'string',
                        makeLink: false,
                        externalLink: false,
                        sortValues: false,
                        numberedList: false,
                        showSource: false,
                        sourceExternalLink: false,
                        minWidth: 70
                      },
                      {
                        id: 'sentletter',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: false,
                        sortValues: false,
                        numberedList: true,
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'num_received',
                        valueType: 'string',
                        makeLink: false,
                        externalLink: false,
                        sortValues: false,
                        numberedList: false,
                        showSource: false,
                        sourceExternalLink: false,
                        minWidth: 70
                      },
                      {
                        id: 'receivedletter',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: false,
                        sortValues: false,
                        numberedList: true,
                        minWidth: 220,
                        onlyOnInstancePage: true
                      }
                    ]}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/letterNetwork`}
                render={() =>
                  <Network
                    pageType='instancePage'
                    results={results}
                    resultUpdateID={this.props.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    resultClass='letterNetwork'
                    uri={tableData.id}
                    limit={100}
                    optimize={2.0}
                    style={cytoscapeStyle}
                    layout={coseLayout}
                    preprocess={preprocessEgo}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/socialSignature`}
                render={() =>
                  <ApexChart
                    pageType='instancePage'
                    rawData={results}
                    rawDataUpdateID={this.props.resultUpdateID}
                    fetching={isLoading}
                    fetchData={this.props.fetchResults}
                    uri={tableData.id}
                    createChartData={createSignatureLineChartData}
                    title='Signatures'
                    xaxisTitle=''
                    yaxisTitle=''
                    resultClass='socialSignature'
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/sentReceived`}
                render={() =>
                  <ApexChart
                    pageType='instancePage'
                    rawData={results}
                    rawDataUpdateID={this.props.resultUpdateID}
                    fetching={isLoading}
                    fetchData={this.props.fetchResults}
                    uri={tableData.id}
                    createChartData={createMultipleLineChartData}
                    title='Letters by year'
                    xaxisTitle='Year'
                    yaxisTitle='Number of letters'
                    resultClass='sentReceived'
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/sentReceivedByPlace`}
                render={() =>
                  <ApexChart
                    pageType='instancePage'
                    rawData={results}
                    rawDataUpdateID={this.props.resultUpdateID}
                    fetching={isLoading}
                    fetchData={this.props.fetchResults}
                    uri={tableData.id}
                    createChartData={createMultipleLineChartData}
                    title='Letters by year'
                    xaxisTitle='Year'
                    yaxisTitle='Number of letters'
                    resultClass='sentReceivedByPlace'
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/sentReceivedByTie`}
                render={() =>
                  <ApexChart
                    pageType='instancePage'
                    rawData={results}
                    rawDataUpdateID={this.props.resultUpdateID}
                    fetching={isLoading}
                    fetchData={this.props.fetchResults}
                    uri={tableData.id}
                    createChartData={createMultipleLineChartData}
                    title='Letters by year'
                    xaxisTitle='Year'
                    yaxisTitle='Number of letters'
                    resultClass='sentReceivedByTie'
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/export`}
                render={() =>
                  <Export
                    sparqlQuery={this.props.sparqlQuery}
                    pageType='instancePage'
                    id={tableData.id}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/tieNetwork`}
                render={() =>
                  <Network
                    pageType='instancePage'
                    results={results}
                    resultUpdateID={this.props.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    resultClass='tieNetwork'
                    uri={tableData.id}
                    limit={32}
                    optimize={1.5}
                    style={cytoscapeStyle}
                    layout={coseLayout}
                    preprocess={preprocessTie}
                  />}
              />
            </>}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  resultClass: PropTypes.string.isRequired,
  tableData: PropTypes.object,
  tableExternalData: PropTypes.object,
  analysisData: PropTypes.object,
  analysisDataUpdateID: PropTypes.number,
  sparqlQuery: PropTypes.string,
  properties: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  routeProps: PropTypes.object.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export const InstanceHomePageComponent = InstanceHomePage

export default withStyles(styles)(InstanceHomePage)
