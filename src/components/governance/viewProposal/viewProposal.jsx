import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Paper, Slide, IconButton } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { getProposal, startLoader, stopLoader, vote } from '../../../store/service/api';

// import Vote from '../vote'
import PasswordModal from '../../passwordModal'
import Snackbar from '../../snackbar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start',
    paddingBottom: '36px'
  },
  header: {
    padding: '30px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  body: {
    paddingTop: '28px'
  },
  infoContainer: {
    padding: '28px 28px',
    border: '1px solid '+colors.border
  },
  content_title: {
    lineHeight: '40px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  pair: {
    padding: '12px',
  },
  pairHeading: {
    color: colors.white
  },
  pairJSON: {
    whiteSpace: 'pre',
    background: colors.background,
    padding: '12px'
  },
  button: {
    verticalAlign: 'middle',
    display: 'block',
    marginBottom: '12px'
  },
  actionPane: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    minHeight: '100vh',
    width: '499px',
    backgroundColor: colors.background,
    zIndex: 999,
  },
  back: {
    display: 'inline-block',
    color: '#fff'
  }
});

class ViewProposal extends Component {

  constructor(props) {
    super();

    this.state = {
      privateKeyModalOpen: false,
      snackbarMessage: null
    };

    this.validateUser = this.validateUser.bind(this)
    this.onChange = this.onChange.bind(this)
    this.nextPath = this.nextPath.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
    this.renderSnackbar = this.renderSnackbar.bind(this)

    const user = this.validateUser()

    if (user !== false) {
      if(!props.proposal && props.match.params.id) {
        getProposal({id: props.match.params.id})
      }
    } else {
      this.nextPath('/', props)
    }
  };

  validateUser() {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    if(user.address && user.keystore) {
      return user
    } else {
      return false
    }
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes, match } = this.props;

    const {
      privateKeyModalOpen,
      snackbarMessage
    } = this.state

    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.container}>
          <Grid item xs={11} className={classes.header}>
            <Typography variant="h1" className={ classes.title }>Governance Portal</Typography>
          </Grid>
          <Grid item xs={11} className={classes.body}>
            { this.renderProposal() }
          </Grid>
        </Grid>
        { match.params.action ? this.renderModal(match.params.action) : null }
        { privateKeyModalOpen ? this.renderPrivateKeyModal() : null }
        { snackbarMessage && this.renderSnackbar() }
      </React.Fragment>
    )
  }

  renderProposal() {

    const {
      proposal,
      classes,
      loading
    } = this.props

    if(!proposal) {
      return null
    }

    return (
      <Grid container>
        <Grid item xs={12} className={ classes.infoContainer }>
          <Grid container justify="flex-start" alignItems="flex-start" spacing={2}>
            <Grid item xs={9} >
              <IconButton onClick={() => this.nextPath('/governance')} disabled={ loading } >
                <ChevronLeftIcon className={ classes.back } />
              </IconButton>
              <Typography variant={ 'h3' } className={ classes.content_title } noWrap>{ proposal.content.value.title }</Typography>
              <Typography variant={ 'body1' } className={ classes.pair }>{ proposal.content.value.description }</Typography>
            </Grid>
            <Grid item xs={3} align='right' >
              <Typography variant={ 'h1' }>#{ proposal.id }</Typography>
              <Typography variant={ 'body1' } className={ classes.pair }><a style={{ color: "#9aa3ad" }} target="_blank" rel="noopener noreferrer" href={"https://explorer.xar.network/proposals/"+proposal.id}>View proposal</a></Typography>
            </Grid>
            { proposal.content.value.changes &&
              <Grid item xs={12} >
                <Typography variant={ 'h3' } className={ classes.content_title } noWrap>Changes proposed</Typography>
                <Typography variant={ 'body1' } className={ classes.pair } noWrap>
                  <span className={ classes.pairHeading }>Subspace: </span>{ proposal.content.value.changes[0].subspace }
                </Typography>
                <Typography variant={ 'body1' } className={ classes.pair } noWrap>
                  <span className={ classes.pairHeading }>Key: </span>{ proposal.content.value.changes[0].key }
                </Typography>
                <Typography variant={ 'body1' } className={ classes.pair }>
                  <span className={ classes.pairHeading }>Value: </span>
                </Typography>
                <Typography className={ classes.pairJSON }>
                  { JSON.stringify(JSON.parse(proposal.content.value.changes[0].value), null, 4) }
                </Typography>
              </Grid>
            }
            <Grid item xs={8} >
              <Typography variant={ 'h3' } className={ classes.content_title } noWrap>Current Proposal Status: { proposal.proposal_status }</Typography>
              <Typography variant={ 'body1' } className={ classes.pair } noWrap>
                <span className={ classes.pairHeading }>Voting Opened: </span>{ formatDate(proposal.voting_start_time) }
              </Typography>
              <Typography variant={ 'body1' } className={ classes.pair } noWrap>
                <span className={ classes.pairHeading }>Voting Closes: </span>{ formatDate(proposal.voting_end_time) }
              </Typography>
            </Grid>
            { proposal.proposal_status === 'VotingPeriod' && <Grid item xs={4} align='right'>
              <Button
                className={ classes.button }
                onClick={() => this.showPrivateKeyModal({ vote: true })}
                variant="contained"
                size='medium'
                color='secondary'
                disabled={ loading }
                >
                  Yes
              </Button>
              <Button
                className={ classes.button }
                onClick={() => this.showPrivateKeyModal({ vote: false })}
                variant="contained"
                size='medium'
                color='secondary'
                disabled={ loading }
                >
                  No
              </Button>
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderSnackbar() {
    const {
      snackbarType,
      snackbarMessage
    } = this.state

    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };

  toggleModal() {

    const {match} = this.props

    this.nextPath('/governance/'+match.params.id)
  }

  showPrivateKeyModal(params) {
    this.setState({ privateKeyModalOpen: true, actionParams: params })
  }

  async submitPrivateKey(signingKey) {
    this.setState({ privateKeyModalOpen: false, snackbarMessage: null, snackbarType: null })

    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)

    const { proposal } = this.props
    const { actionParams } = this.state

    startLoader()

    let response = await vote({
      privateKey: signingKey,
      fromAddress: userOjb.address,
      proposalID: proposal.id,
      vote: actionParams.vote
    })

    stopLoader()

    let snackbarObj = {}

    if(response && response.result && response.result.raw_log && response.result.raw_log.includes('"success":true')) {
      snackbarObj = { snackbarMessage: 'TX: ' + response.result.txhash, snackbarType: 'Success'}
    } else {
      const rawLog = JSON.parse(response.result.raw_log)

      if(rawLog && rawLog.message) {
        snackbarObj = { snackbarMessage: rawLog.message, snackbarType: 'Error'}
      } else {
        snackbarObj = { snackbarMessage: 'An error occurred', snackbarType: 'Error'}
      }
    }

    this.setState(snackbarObj)
  }

  closePrivateKeyModal() {
    this.setState({ privateKeyModalOpen: false })
  }

  renderPrivateKeyModal() {
    return <PasswordModal onSubmit={ this.submitPrivateKey } onClose={ this.closePrivateKeyModal } />
  }

  renderModal(action) {

    const { classes } = this.props

    let content = null

    switch (action) {
      case 'vote':
        // content = <Vote onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      default:
    }

    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper square={ true } elevation={ 3 } className={ classes.actionPane }>
          {content}
        </Paper>
      </Slide>
    )
  }
}

ViewProposal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, governance } = state;
  return {
    loading: loader.loading,
    proposal: governance.proposal
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ViewProposal)))

function formatDate(date) {
  return moment(date).fromNow()
}
