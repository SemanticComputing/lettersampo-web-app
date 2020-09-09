import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import history from '../../History'
import cytoscape from 'cytoscape'

const styles = theme => ({
  root: {
    height: 400,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 21px)'
    }
  },
  cyContainer: {
    width: '100%',
    height: '100%'
  }
})
class Network extends React.Component {
  constructor (props) {
    super(props)
    this.cyRef = React.createRef()
  }

  componentDidMount = () => {
    this.props.fetchResults({
      resultClass: this.props.resultClass,
      facetClass: this.props.facetClass,
      uri: this.props.uri,
      limit: this.props.limit,
      optimize: this.props.optimize
    })

    this.cy = cytoscape({
      container: this.cyRef.current,
      style: this.props.style
    })

    this.cy.on('tap', 'node', function () {
      try {
        if (this.data('href')) {
          history.push(this.data('href'))
        }
      } catch (e) { // fall back on url change
        console.log('Fail', e)
        console.log(this.data())
      }
    })

    this.cy.on('mouseover', 'node', function (event) {
      const node = event.target
      if (node.data('href')) {
        document.body.style.cursor = 'pointer'
      }
      /** // possibility to change node appearance
      node.style({
        'background-color': '#F00'}
        )
      */
    })

    this.cy.on('mouseout', 'node', function (event) {
      document.body.style.cursor = 'default'
    })
  }

  componentDidUpdate = prevProps => {
    if (prevProps.resultUpdateID !== this.props.resultUpdateID) {
      // console.log(this.props.results.elements)
      this.cy.elements().remove()
      if (this.props.preprocess) {
        this.props.preprocess(this.props.results.elements)
      }
      this.cy.add(this.props.results.elements)
      this.cy.layout(this.props.layout).run()
    }
    // check if filters have changed
    if (prevProps.facetUpdateID !== this.props.facetUpdateID) {
      this.props.fetchResults({
        resultClass: this.props.resultClass,
        facetClass: this.props.facetClass
      })
    }
  }

  render = () => {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.cyContainer} ref={this.cyRef} />
      </div>
    )
  }
}

Network.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.object,
  fetchResults: PropTypes.func,
  fetchNetworkById: PropTypes.func,
  resultClass: PropTypes.string.isRequired,
  facetClass: PropTypes.string,
  facetUpdateID: PropTypes.number,
  resultUpdateID: PropTypes.number.isRequired,
  uri: PropTypes.string,
  limit: PropTypes.number.isRequired,
  optimize: PropTypes.number.isRequired,
  style: PropTypes.array.isRequired,
  layout: PropTypes.object.isRequired,
  preprocess: PropTypes.func
}

export default withStyles(styles)(Network)
