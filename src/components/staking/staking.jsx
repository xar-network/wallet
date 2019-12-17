import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, InputBase, Paper, Slide } from '@material-ui/core'
import { fade } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import Loader from '../loader'
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import DelegateCSDT from '../csdt/delegateCSDT'
import UndelegateCSDT from '../csdt/undelegateCSDT'
import RewardsCSDT from '../csdt/rewardsCSDT'
import PasswordModal from '../passwordModal'
import Snackbar from '../snackbar'

import {
  startLoader,
  stopLoader,
  getPrices,
  getBalance,
  getAllDelegations,
  getAllBondedValidators,
  getAllUnbondingDelegations,
  getDelegationRewards,
  getAllValidators,
  withdrawDelegationRewards,
  delegateStake,
  undelegateStake,
  getCSDT,
} from '../../store/service/api';

const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start',
  },
  header: {
    padding: '30px',
    borderBottom: '1px solid '+colors.border
  },
  headerButton: {
    padding: '34px 0px',
    borderBottom: '1px solid '+colors.border,
    verticalAlign: 'bottom'
  },
  title: {
    color: colors.lightGray
  },
  body: {
    paddingBottom: '36px'
  },
  refreshButton: {
    cursor: 'pointer',
    height: '44px',
    fill: colors.border
  },
  infoContainer: {
    marginTop: '28px',
    border: '1px solid '+colors.border
  },
  moniker: {
    padding: '16px'
  },
  identity: {
    padding: '0px 16px'
  },
  details: {
    padding: '0px 16px'
  },
  address: {
    padding: '0px 16px 16px 16px'
  },
  website: {
    padding: '0px 16px 16px 16px'
  },
  status: {
    padding: '16px 16px'
  },
  tokens: {
    padding: '32px',
    borderTop: '1px solid '+colors.lightGray
  },
  delegations: {
    padding: '32px',
    borderTop: '1px solid '+colors.lightGray
  },
  commission: {
    padding: '32px',
    borderTop: '1px solid '+colors.lightGray,
    borderLeft: '1px solid '+colors.lightGray,
    borderRight: '1px solid '+colors.lightGray
  },
  monikerTitle: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  active: {
    display: 'inline-block',
    verticalAlign: 'middle',
    background: colors.green,
    padding: '12px',
    borderRadius: '3px',
    width: '57px',
    marginLeft: '12px'
  },
  inactive: {
    display: 'inline-block',
    verticalAlign: 'middle',
    background: colors.red,
    padding: '12px',
    borderRadius: '3px',
    width: '73px',
    marginLeft: '12px'
  },
  actions: {
    padding: '32px'
  },
  button: {
    marginTop: '12px'
  },
  search: {
    height: '46px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    height: '46px'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  actionPane: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    bottom: '0px',
    width: '499px',
    backgroundColor: colors.background
  },
});

const ftm = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'FTM',
  minimumFractionDigits: 2
})

const crypto = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 4
})

class Staking extends Component {

  constructor(props) {
    super();

    this.state = {
      search: '',
      snackbarMessage: null,
      snackbarType: null,
      privateKeyModalOpen: false,
      actionParams: null,
    };

    this.onChange = this.onChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
    this.renderSnackbar = this.renderSnackbar.bind(this)

    getAllValidators()
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  async onRefresh() {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    startLoader()
    getPrices()
    getAllValidators()
    getBalance({ address: user.address })
    getAllDelegations({ address: user.address })
    getAllUnbondingDelegations({ address: user.address })
    getAllBondedValidators({ address: user.address })
    getDelegationRewards({ address: user.address })
    await getCSDT({ address: user.address, denom: 'uftm' })
    stopLoader()
  }

  render() {
    const { search, privateKeyModalOpen, snackbarMessage } = this.state
    const { classes, match } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={7} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>Staking Dashboard</Typography>
        </Grid>
        <Grid item xs={4} className={classes.headerButton} align='left'>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id={'search'}
              value={ search }
              onChange={this.onChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        <Grid item xs={11} className={classes.body}>
          <Grid container>
            { this.renderValidators() }
          </Grid>
        </Grid>
        { match.params.action ? this.renderModal(match.params.action) : null }
        { privateKeyModalOpen ? this.renderPrivateKeyModal() : null }
        { snackbarMessage && this.renderSnackbar() }
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

  renderValidators() {
    const { search } = this.state
    const { validators } = this.props

    if(!validators) {
      return null
    }

    return validators
      .filter((validator) => {
        if(!search || search === '') {
          return true
        }

        return validator.description.moniker.toLowerCase().includes(search.toLowerCase()) ||
          validator.operator_address.toLowerCase().includes(search.toLowerCase()) ||
          validator.description.website.toLowerCase().includes(search.toLowerCase())
      })
      .map((validator) => {
      return this.renderValidator(validator)
    })

  }

  renderValidator(validator) {

    const { classes, loading } = this.props

    const status = validator.status === 2 ? "Active" : 'Inactive'
    let color = classes.inactive

    if(validator.status === 2) {
      color = classes.active
    }

    const validatorWebsite = validator.description.website ? <a style={{ color: "#9aa3ad" }} target="_blank" href={validator.description.website}>{validator.description.website}</a> : null

    return (
      <Grid item xs={12} className={ classes.infoContainer }>
        <Grid container justify="flex-start" alignItems="flex-start">
          <Grid item xs={9} className={ classes.moniker }>
            <Typography variant={ 'h1' } className={ classes.monikerTitle }>{ validator.description.moniker }</Typography>
            <Typography variant={ 'h3' } className={ color }>{ status }</Typography>
            <Typography variant={ 'body1' }>{ validator.description.details }</Typography>
            <Typography variant={ 'body1' }>{ validatorWebsite }</Typography>
              <Typography variant={ 'body1' }>{ validator.operator_address }</Typography>
          </Grid>
          <Grid item xs={3} className={ classes.actions } align='right'>
            <Button
              onClick={() => this.nextPath('/staking/delegate')}
              variant="contained"
              size='medium'
              color='secondary'
              disabled={ loading }
              >
                Delegate
            </Button>
            <Button
              className={ classes.button }
              onClick={() => this.nextPath('/staking/undelegate')}
              variant="contained"
              size='medium'
              color='secondary'
              disabled={ loading }
              >
                Undelegate
            </Button>
          </Grid>
          <Grid item xs={4} className={ classes.tokens } align={ 'center' }>
            <Typography variant={ 'body1' }>STAKED</Typography>
            <Typography variant={ 'h1' }>{ ftm.format(validator.tokens/1000000) }</Typography>
          </Grid>
          <Grid item xs={4} className={ classes.commission } align={ 'center' }>
            <Typography variant={ 'body1' }>COMMISSION</Typography>
            <Typography variant={ 'h1' }>{ validator.commission.commission_rates.rate*100 }%</Typography>
          </Grid>
          <Grid item xs={4} className={ classes.delegations } align={ 'center' }>
            <Typography variant={ 'body1' }>DELEGATED</Typography>
            <Typography variant={ 'h1' }>{ crypto.format((parseInt(validator.delegator_shares)-parseInt(validator.tokens))/1000000) }</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  toggleModal() {
    this.nextPath('/staking')
  }

  showPrivateKeyModal(params) {
    this.setState({ privateKeyModalOpen: true, actionParams: params })
  }

  async submitPrivateKey(signingKey) {
    this.setState({ privateKeyModalOpen: false, snackbarMessage: null, snackbarType: null })

    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)

    const { match } = this.props
    const { actionParams } = this.state


    startLoader()

    let response = null;

    switch (match.params.action) {
      case 'delegate':
        response = await delegateStake({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          toAddress: actionParams.recipient,
          denom: 'ucsdt',
          amount: actionParams.amount
        })
        break;
      case 'undelegate':
        response = await undelegateStake({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          toAddress: actionParams.recipient,
          denom: 'ucsdt',
          amount: actionParams.amount
        })
        break;
      case 'rewards':
        response = await withdrawDelegationRewards({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          validatorAddress: actionParams.recipient,
        })
        break;
    }

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

    const { classes, calculateRatios } = this.props

    let content = null

    switch (action) {
      case 'delegate':
        content = <DelegateCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'undelegate':
        content = <UndelegateCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'rewards':
        content = <RewardsCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
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

Staking.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, staking } = state;
  return {
    loading: loader.loading,
    validators: staking.validators
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Staking)))
