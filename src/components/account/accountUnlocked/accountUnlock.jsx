import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    borderLeft: '1px solid '+colors.border,
    width: '100%',
    height: '100%',
    alignContent: 'flex-start'
  },
  header: {
    padding: '30px',
    backgroundColor: '#202930',
    margin: '0 auto',
    borderBottom: '1px solid '+colors.border
  },
  balancesContainer: {
    backgroundColor: colors.background,
  },
  pricesContainer: {
    padding: '24px',
    backgroundColor: colors.background
  },
  inputContainer: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '16px'
  },
  walletIcon: {
    color: colors.white,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  walletAddress: {
    display: 'inline-block',
    width: 'calc(100% - 36px)',
    marginRight: '12px',
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
    padding: '16px 24px'
  },
  pricePrice: {
    padding: '16px 6px'
  },
  priceHeader: {
    marginBottom: '30px'
  },
  network: {
    padding: '24px',
    backgroundColor: colors.background,
    borderBottom: '1px solid '+colors.border,
    borderTop: '1px solid '+colors.border,
  },
  dot: {
    height: '10px',
    width: '10px',
    backgroundColor: colors.green,
    borderRadius: '50%',
    display: 'inline-block',
  },
  inline: {
    display: 'inline-block'
  }
});

class AccountUnlocked extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={12} className={classes.header}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h2" noWrap className={classes.walletAddress}>zar18nt8l824c36rh9ppuh3e9c469xkrekyuj5t3ur</Typography>
              <AccountBalanceWalletOutlinedIcon className={classes.walletIcon} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.balancesContainer}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            { this.renderAssetsHeader() }
            { this.renderAssets() }
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.network}>
          <div className={ classes.dot }> </div>
          <Typography variant="body2" align={ "center" } className={ classes.inline }>Fantom Mainnet ZAR</Typography>
        </Grid>
        <Grid item xs={12} className={classes.pricesContainer}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            { this.renderPricesHeader() }
            { this.renderPrices() }
          </Grid>
        </Grid>
      </Grid>
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
    const prices = [
      { denom: 'USD', pair: 'ETH/USD', price: '160.932' },
      { denom: 'ETH', pair: 'PETH/ETH', price: '1.046' },
      { denom: 'USD', pair: 'DAI/USD', price: '1.000' },
      { denom: 'USD', pair: 'MKR/USD', price: '457.226' }
    ]

    return prices.map((price) => {
      return this.renderPrice(price)
    })
  }

  renderPrice(price) {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={6} className={ classes.pricePair }>
          <Typography variant={ 'body1' }>{ price.pair }</Typography>
        </Grid>
        <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
          <Typography variant={ 'h3' }>{ price.price }</Typography>
        </Grid>
        <Grid item xs={1} className={ classes.pricePrice }>
          <Typography variant={ 'body1' }>{ price.denom }</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderAssetsHeader() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={7} className={ classes.tableHeader }>
          <Typography>ASSET</Typography>
        </Grid>
        <Grid item xs={5} className={ classes.tableHeader }>
          <Typography>BALANCE</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderAssets() {
    const assets = [
      { denom: 'ftm', name: 'Fantom', balance: '10203.503' },
      { denom: 'zar', name: 'ZAR Token', balance: '826.45' }
    ]

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
        <Grid item xs={7} className={ classes['tableBody' + alternating] }>
          <Typography variant={ 'h3' }>{ asset.name }</Typography>
        </Grid>
        <Grid item xs={5} className={ classes['tableBody' + alternating] }>
        <Typography variant={ 'h3' }>{ asset.balance + ' ' + asset.denom }</Typography>
        </Grid>
      </React.Fragment>
    )
  }
}

AccountUnlocked.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(AccountUnlocked)))
