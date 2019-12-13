import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Tooltip,
  Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import withWidth from '@material-ui/core/withWidth';
import { colors } from '../../theme'
import { lockAccount, getNodeInfo, getPrices } from '../../../store/service'
import AccountTransfer from '../accountTransfer';
import Snackbar from '../../snackbar';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  container: {
    alignContent: 'flex-start'
  },
  header: {
    padding: '30px',
    backgroundColor: '#202930',
    margin: '0 auto',
    borderBottom: '1px solid '+colors.border,
    borderTop: '1px solid '+colors.border
  },
  balancesContainer: {
  },
  pricesContainer: {
    padding: '00px 0px',
    backgroundColor: colors.background,
    borderBottom: '1px solid '+colors.border
  },
  globalContainer: {
    padding: '30px 0px',
    backgroundColor: colors.background,
    borderBottom: '1px solid '+colors.border
  },
  inputContainer: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '16px'
  },
  walletAddress: {
    fontSize: '15px',
    display: 'inline-block',
    width: 'calc(100% - 36px)',
    verticalAlign: 'middle'
  },
  tableHeader: {
    padding: '12px 24px'
  },
  tableBody1: {
    padding: '24px',
    backgroundColor: colors.card
  },
  tableBody0: {
    padding: '24px'
  },
  pricePair: {
    padding: '12px 24px'
  },
  pricePrice: {
    padding: '24px'
  },
  priceHeader: {
    padding: '24px',
  },
  network: {
    padding: '24px',
    backgroundColor: colors.background,
    borderBottom: '1px solid '+colors.border,
    borderTop: '1px solid '+colors.border,
    margin: '0 auto'
  },
  dot: {
    height: '10px',
    width: '10px',
    backgroundColor: colors.green,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px'
  },
  inline: {
    display: 'inline-block'
  },
  percent: {
    color: colors.lightGray,
    display: 'inline-block'
  },
  csdtInfoHeader: {
    marginBottom: '6px'
  },
  csdtInfoValue: {
    marginBottom: '30px'
  },
  sendIcon: {
    fill: colors.lightGray,
    height: '15px',
    cursor: 'pointer'
  },
  logOutButton: {
    padding: '32px'
  },
  filler: {
    minHeight: '30px',
    flex: 1
  },
  wholeContaienr: {
    minHeight: '100%',
    display: 'flex',
    flexFlow: 'column',
    borderLeft: '1px solid '+colors.border,
    backgroundColor: colors.background,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'none'
    },
  }
});

class AccountUnlocked extends Component {

  constructor(props) {
    super();

    this.state = {
      account: props.account,
      snackbarMessage: null,
      snackbarType: null
    };

    this.handleLogout = this.handleLogout.bind(this)
    this.sendClicked = this.sendClicked.bind(this)
    this.cancelSendClicked = this.cancelSendClicked.bind(this)
    this.renderSnackbar = this.renderSnackbar.bind(this)

    getPrices()
    getNodeInfo()
  };

  componentDidUpdate(prevProps) {
    // if (!this.props.account || !this.props.account.privateKey) {
    //   this.nextPath('/');
    // }
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  handleLogout() {
    lockAccount()
    sessionStorage.removeItem('xar-csdt-user')
    this.props.setFlow('options')
    this.nextPath('/');
  };

  sendClicked(denom) {
    this.setState({ sendOpen: true, sendDenom: denom, snackbarMessage: null, snackbarType: null })
  };

  cancelSendClicked(snackbarObj) {
    this.setState({ sendOpen: false, snackbarMessage: (snackbarObj ? snackbarObj.snackbarMessage : null), snackbarType: (snackbarObj ? snackbarObj.snackbarType : null) })
  };

  render() {
    const { classes, account, nodeInfo, accountsCollapsed } = this.props;
    const { sendOpen, snackbarMessage } = this.state

    if(!account) {
      return null
    }

    return (

      <div className={classes.wholeContaienr}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.container}>
          <Grid item xs={12} className={classes.header}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center">
              <Grid item xs={12} align='center'>
                <Tooltip title={account.address} placement="bottom">
                  <Typography variant="h2" noWrap className={classes.walletAddress}>{ account.address }</Typography>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          { !accountsCollapsed && <React.Fragment>
          <Grid item xs={12} className={classes.balancesContainer}>
            { !sendOpen && <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center">
              { this.renderAssetsHeader() }
              { this.renderAssets() }
            </Grid>}
            { sendOpen && <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center">
              { this.renderSend() }
            </Grid>}
          </Grid>
          <Grid item xs={12} className={classes.network} align={ 'center' }>
            <div className={ classes.dot }> </div>
            <Typography variant="body2" align={ "center" } className={ classes.inline }>{ (nodeInfo && nodeInfo.node_info) ? nodeInfo.node_info.network : 'Unknown' }</Typography>
          </Grid>
          {/*<Grid item xs={12} className={classes.pricesContainer}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center">
              { this.renderPricesHeader() }
              { this.renderPrices() }
            </Grid>
          </Grid>*/}
          </React.Fragment>}
          { snackbarMessage && this.renderSnackbar() }
        </Grid>
        { !accountsCollapsed && <React.Fragment>
          <div className={classes.filler}>

          </div>
          <div className={ classes.logOutButton }>
            <Button
              fullWidth
              onClick={() => this.handleLogout('unlock') }
              variant="outlined"
              size='large'
              >
                Log Out
            </Button>
          </div>
        </React.Fragment>}
      </div>
    )
  }

  renderSnackbar() {
    const {
      snackbarType,
      snackbarMessage
    } = this.state

    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };

  renderSend() {
    const {
      sendDenom
    } = this.state

    return <AccountTransfer sendDenom={sendDenom} cancelSendClicked={this.cancelSendClicked} />
  }

  renderGlobalHeader() {
    const { classes } = this.props
    return (
      <Grid item xs={12} className={ classes.priceHeader }>
        <Typography variant={ 'h4' }>Global CSDT Info</Typography>
      </Grid>
    )
  }

  renderGlobalInfo() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Grid item xs={12} className={ classes.csdtInfoHeader }>
          <Typography variant={ 'body1' }>Global CSDT Collateralization</Typography>
        </Grid>
        <Grid item xs={12} className={ classes.csdtInfoValue }>
          <Typography variant={ 'h3' } className={ classes.inline }>{ '344.35%' }</Typography>
          <Typography variant={ 'h3' } className={ classes.percent }>{ '%' }</Typography>
        </Grid>
        <Grid item xs={12} className={ classes.csdtInfoHeader }>
          <Typography variant={ 'body1' }>Maximum Global FTM Available</Typography>
        </Grid>
        <Grid item xs={12} className={ classes.csdtInfoValue }>
          <Typography variant={ 'h3' } className={ classes.inline }>{ '90 805 411' }</Typography>
          <Typography variant={ 'h3' } className={ classes.percent }>{ '$' }</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderPricesHeader() {
    const { classes } = this.props
    return (
      <Grid item xs={12} className={ classes.priceHeader }>
        <Typography variant={ 'h4' }>Price Info</Typography>
      </Grid>
    )
  }

  renderPrices() {
    const {
      csdtPrices,
      classes
    } = this.props

    if(!csdtPrices || csdtPrices.length === 0) {
      return (<Grid item xs={12} className={ classes['tableBody0'] }>
        <Typography variant={ 'h3' }>Unable to retrieve asset pricing</Typography>
      </Grid>)
    }

    return csdtPrices.map((price) => {
      return this.renderPrice(price)
    })
  }

  renderPrice(price) {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={6} className={ classes.pricePair }>
          <Typography variant={ 'body1' }>{ (price.asset_code ? price.asset_code.toUpperCase() : 'Unknown') + ' / UCSDT' }</Typography>
        </Grid>
        <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
          <Typography variant={ 'h3' }>{ '$'+parseFloat(price.price).toFixed(4) }</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderAssetsHeader() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={4} className={ classes.tableHeader }>
          <Typography>ASSET</Typography>
        </Grid>
        <Grid item xs={3} className={ classes.tableHeader }>
          <Typography>SEND</Typography>
        </Grid>
        <Grid item xs={5} align='right' className={ classes.tableHeader }>
          <Typography>BALANCE</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderAssets() {
    const {
      classes,
      balances
    } = this.props;

    const assets = balances

    if(!assets || assets.length === 0) {
      return <Grid item xs={12} className={ classes['tableBody1'] }>
        <Typography variant={ 'h3' }>There are no assets in this wallet</Typography>
      </Grid>
    }

    let index = 0
    return assets.map((asset) => {
      index++
      return this.renderAsset(asset, index)
    })
  }

  renderAsset(asset, index) {
    const { classes } = this.props;
    const alternating = index % 2

    return (
      <React.Fragment>
        <Grid item xs={4} className={ classes['tableBody' + alternating] }>
          <Typography variant={ 'h3' }>{ asset.denom }</Typography>
        </Grid>
        <Grid item xs={3} className={ classes['tableBody' + alternating] }>
          <SendIcon className={ classes.sendIcon } onClick={ () => { this.sendClicked(asset.denom) } } />
        </Grid>
        <Grid item xs={5} align='right' className={ classes['tableBody' + alternating] }>
          <Typography variant={ 'h3' } noWrap>{ asset.amount + ' ' + asset.denom }</Typography>
        </Grid>
      </React.Fragment>
    )
  }
}

AccountUnlocked.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, prices, nodeInfo, screen } = state;
  return {
    account: accounts.account,
    balances: accounts.balances,
    csdtPrices: prices.prices,
    nodeInfo: nodeInfo.nodeInfo,
    accountsCollapsed: screen.accountsCollapsed
  };
};

export default withRouter(connect(mapStateToProps)(withWidth()(withStyles(styles)(AccountUnlocked))))
