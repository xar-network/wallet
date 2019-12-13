import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import NoCSDTs from './noCSDTs'
import OpenCSDT from './openCSDT'
import ConfirmCSDT from './confirmCSDT'
import MyCSDT from './myCSDT'
import Loader from '../loader'

import {
  getCSDT,
  getAllDelegations,
  getDelegationRewards,
  startLoader,
  stopLoader,
  getAllValidators,
  getPrices
} from '../../store/service';

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
      csdtPrices: props.csdtPrices,
      csdt: props.csdt
    };

    this.calculateRatios = this.calculateRatios.bind(this)
    this.validateUser = this.validateUser.bind(this)

    const user = this.validateUser()

    if (user !== false) {

      if(!props.csdt) {
        getCSDT({ address: user.address, denom: 'uftm' })
      }
      if(!props.delegations) {
        getAllDelegations({ address: user.address })
      }
      if(!props.dleegationRewards) {
        getDelegationRewards({ address: user.address })
      }
      if(!props.validators) {
        getAllValidators()
      }
      if(!props.csdtPrices) {
        getPrices()
      }

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
    const { match, loading } = this.props;

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

    if(!collateral || collateral === "") {
      collateral = 0
    }

    if(!generated || generated === "") {
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
  const { csdts, prices, loader, staking } = state;
  return {
    csdt: csdts.csdt,
    csdtPrices: prices.prices,
    loading: loader.loading,
    delegations: staking.delegations,
    validators: staking.validators
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CSDT)))
