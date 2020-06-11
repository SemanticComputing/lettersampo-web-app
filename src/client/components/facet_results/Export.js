import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button'
import { yasguiBaseUrl, yasguiParams } from '../../configs/emlo/GeneralConfig'
import querystring from 'querystring'
import intl from 'react-intl-universal'

const styles = theme => ({
  root: {
    height: 'calc(100% - 72px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    textDecoration: 'none'
  },
  button: {
    margin: theme.spacing(3)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
})

class Export extends React.Component {
  render = () => {
    const { classes, sparqlQuery } = this.props
    let yasguiUrl = ''
    if (this.props.sparqlQuery !== null) {
      yasguiUrl = `${yasguiBaseUrl}/#query=${encodeURIComponent(sparqlQuery)}&${querystring.stringify(yasguiParams)}`
    }
    return (
      <div className={classes.root}>
        <a
          className={classes.link}
          href={yasguiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='contained' color='primary' className={classes.button}>
            {intl.get('exportToYasgui')}
          </Button>
        </a>
        {this.props.pageType === 'instancePage' &&
          <a
            className={classes.link}
            href={this.props.id}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant='contained' color='primary' className={classes.button}>
              {intl.get('openInLinkedDataBrowser')}
            </Button>
          </a>}
      </div>
    )
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired,
  pageType: PropTypes.string.isRequired,
  sparqlQuery: PropTypes.string,
  id: PropTypes.string
}

export default withStyles(styles)(Export)
