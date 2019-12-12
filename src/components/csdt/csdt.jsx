import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import NoCSDTs from './noCSDTs'
import OpenCSDT from './openCSDT'
import ConfirmCSDT from './confirmCSDT'
import MyCSDT from './myCSDT'
import Account from '../account'
import Loader from '../loader'

import store from '../../store/';
import * as actions from '../../store/actions';
import {
  getCSDTParameters,
  getCSDT,
  getAllDelegations,
  getAllBondedValidators,
  getAllUnbondingDelegations,
  getBalance,
  getDelegationRewards
} from '../../store/service';

import logo from '../../assets/xar-logo.png'

const styles = theme => ({
  container: {
    backgroundColor: colors.card,
    width: '100%',
    height: '100%'
  },
  maxHeight: {
    height: '100%'
  },
  minHeight: {
    minHeight: '100%'
  },
  holder: {
    position: 'relative',
    height: '100%'
  },
  screenContainer: {
    width: 'calc(100% - 70px)',
    display: 'inline-block',
    height: '100%'
  }
});

class CSDT extends Component {

  constructor(props) {
    super();

    this.state = {
      account: props.account,
      csdtParameters: props.csdtParameters,
      csdtPrices: props.csdtPrices,
      csdt: props.csdt
    };

    this.calculateRatios = this.calculateRatios.bind(this)
    this.validateUser = this.validateUser.bind(this)

    const user = this.validateUser()

    if (user !== false) {
      getCSDTParameters()
      getCSDT({ address: user.address, denom: 'uftm' })
      getAllDelegations({ address: user.address })
      getAllUnbondingDelegations({ address: user.address })
      getAllBondedValidators({ address: user.address })
      getDelegationRewards({ address: user.address })
    } else {
      this.nextPath('/', props)
    }
  };

  nextPath(path, props) {
    props.history.push(path);
  }

  validateUser() {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    if(user.address && user.keystore) {
      return user
    } else {
      return false
    }
  }

  render() {
    const { classes, match, loading } = this.props;

    return (
      <React.Fragment>
        { this.renderScreen(match.params.view) }
        { loading && <Loader /> }
      </React.Fragment>
    )
  }

  renderScreen(view) {
    const { csdt } = this.props;
    switch (view) {
      case 'open':
        return <OpenCSDT calculateRatios={this.calculateRatios} />
      case 'confirm':
        return <ConfirmCSDT calculateRatios={this.calculateRatios} />
      case 'mycsdt':
        return <MyCSDT calculateRatios={this.calculateRatios} />
      default:
        if(csdt && csdt.collateral_amount && csdt.collateral_amount.length > 0) {
          return <MyCSDT calculateRatios={this.calculateRatios} />
        } else {
          return <NoCSDTs calculateRatios={this.calculateRatios} />
        }
    }
  }

  calculateRatios(collateral, collateralDenom, generated, minimumCollateralizationRatio) {

    const { csdtPrices } = this.props

    let currentPrice = 0
    let liquidationPrice = 0
    let collateralizationRatio = 0
    let maxGenerated = 0
    let maxWithdraw = 0

    if(!collateral || collateral == "") {
      collateral = 0
    }

    if(!generated || generated == "") {
      generated = 0
    }

    if(csdtPrices && csdtPrices.length > 0) {
      const price = csdtPrices.filter((price) => {
        return price.asset_code === collateralDenom
      })

      if(price.length > 0) {
        currentPrice = parseFloat(price[0].price)

        if(generated > 0) {
          collateralizationRatio = parseFloat(currentPrice * parseFloat(collateral) * 100 / generated).toFixed(4)
          maxWithdraw = Math.floor((collateral - (collateral * minimumCollateralizationRatio / collateralizationRatio))).toFixed(0)
          liquidationPrice = (minimumCollateralizationRatio * currentPrice / collateralizationRatio).toFixed(4)
        }

        maxGenerated = Math.floor(((collateral * currentPrice * 100 / minimumCollateralizationRatio) - generated)).toFixed(0)

        return {
          currentPrice,
          collateralizationRatio,
          liquidationPrice,
          maxGenerated,
          maxWithdraw,
        }
      }
    }

    return {
      currentPrice,
      collateralizationRatio,
      liquidationPrice,
      maxGenerated,
      maxWithdraw
    }
  }
}

CSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, csdts, prices, loader } = state;
  return {
    csdt: csdts.csdt,
    accounts: accounts.account,
    csdtParameters: csdts.csdtParameters,
    csdtPrices: prices.prices,
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CSDT)))
