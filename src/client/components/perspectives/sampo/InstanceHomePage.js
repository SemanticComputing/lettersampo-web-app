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
import Export from '../../facet_results/Export'
import Recommendations from './Recommendations'
import { coseLayout, cytoscapeStyle } from '../../../configs/sampo/Cytoscape.js/NetworkConfig'
import { createMultipleLineChartData } from '../../../configs/sampo/ApexCharts/LineChartConfig'
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

  componentDidMount = () => this.fetchData()

  componentDidUpdate = prevProps => {
    if (prevProps.routeProps.location !== this.props.routeProps.location) {
      this.fetchData()
    }
  }

  fetchData = () => {
    let uri = ''
    const base = 'http://ldf.fi/mmm'
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.tabs.map(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    this.setState({ localID: localID })
    switch (this.props.resultClass) {
      case 'perspective1':
        uri = `${base}/manifestation_singleton/${localID}`
        break
      case 'perspective2':
        uri = `${base}/work/${localID}`
        break
      case 'perspective3':
        uri = `${base}/event/${localID}`
        break
      case 'manuscripts':
        uri = `${base}/manifestation_singleton/${localID}`
        break
      case 'expressions':
        uri = `${base}/expression/${localID}`
        break
      case 'collections':
        uri = `${base}/collection/${localID}`
        break
      case 'works':
        uri = `${base}/work/${localID}`
        break
      case 'events':
        uri = `${base}/event/${localID}`
        break
      case 'actors':
        uri = `${base}/actor/${localID}`
        break
      case 'places':
        uri = `${base}/place/${localID}`
        break
      case 'finds':
        uri = `http://ldf.fi/findsampo/finds/${localID}`
        break
      case 'emloActors':
        uri = `http://emlo.bodleian.ox.ac.uk/id/${localID}`
        break
      case 'emloLetters':
        uri = `http://emlo.bodleian.ox.ac.uk/id/${localID}`
        break
      case 'emloPlaces':
        uri = `http://emlo.bodleian.ox.ac.uk/id/${localID}`
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
    const { classes, tableData, isLoading, resultClass, rootUrl } = this.props
    const hasData = tableData !== null && Object.values(tableData).length >= 1
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
          {!hasData &&
            <>
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </>}
          {hasData &&
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
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/network`}
                render={() =>
                  <Network
                    pageType='instancePage'
                    results={this.props.results}
                    resultUpdateID={this.props.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    resultClass='manuscriptInstancePageNetwork'
                    uri={tableData.id}
                    limit={200}
                    optimize={1.2}
                    style={cytoscapeStyle}
                    layout={coseLayout}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/emloLetterNetwork`}
                render={() =>
                  <Network
                    pageType='instancePage'
                    results={this.props.results}
                    resultUpdateID={this.props.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    resultClass='emloLetterNetwork'
                    uri={tableData.id}
                    limit={100}
                    optimize={5.0}
                    style={cytoscapeStyle}
                    layout={coseLayout}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/emloSentReceived`}
                render={() =>
                  <ApexChart
                    pageType='instancePage'
                    rawData={this.props.results}
                    rawDataUpdateID={this.props.resultUpdateID}
                    fetching={isLoading}
                    fetchData={this.props.fetchResults}
                    uri={tableData.id}
                    createChartData={createMultipleLineChartData}
                    title='Letters by year'
                    xaxisTitle='Year'
                    yaxisTitle='Number of letters'
                    resultClass='emloSentReceived'
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/recommendations`}
                render={() =>
                  <Recommendations
                    rootUrl={this.props.rootUrl}
                    routeProps={this.props.routeProps}
                    results={this.props.results}
                    resultUpdateID={this.props.resultUpdateID}
                    isLoading={isLoading}
                    tableData={tableData}
                    properties={this.props.properties}
                    leafletMap={this.props.leafletMap}
                    fetchResults={this.props.fetchResults}
                    fetchGeoJSONLayers={this.props.fetchGeoJSONLayers}
                    fetchGeoJSONLayersBackend={this.props.fetchGeoJSONLayersBackend}
                    clearGeoJSONLayers={this.props.clearGeoJSONLayers}
                    fetchByURI={this.props.fetchByURI}
                    showError={this.props.showError}
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
            </>}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  resultClass: PropTypes.string.isRequired,
  tableData: PropTypes.object,
  tableExternalData: PropTypes.object,
  results: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resultUpdateID: PropTypes.number.isRequired,
  sparqlQuery: PropTypes.string,
  properties: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  routeProps: PropTypes.object.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  clearGeoJSONLayers: PropTypes.func.isRequired,
  leafletMap: PropTypes.object.isRequired,
  showError: PropTypes.func.isRequired
}

export const InstanceHomePageComponent = InstanceHomePage

export default withStyles(styles)(InstanceHomePage)
