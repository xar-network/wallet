import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, InputAdornment,  } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'

import store from '../../store/';
import * as actions from '../../store/actions';
import { getCSDTParameters } from '../../store/service/api/csdts.js';
import { getPrices } from '../../store/service/api/prices.js';
import { getInterest } from '../../store/service/api/interest.js';
import { getSupply } from '../../store/service/api/supply.js';
import { getStaking } from '../../store/service/api/staking.js';


const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start'
  },
  header: {
    padding: '30px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  body: {
    padding: '30px'
  },
  openCSDT: {
    marginTop: '32px'
  },
  back: {
    marginTop: '32px',
    marginRight: '12px'
  },
  heading: {
    marginTop: '42px',
    marginBottom: '42px'
  },
  infoContainer: {
    marginTop: '48px',
    padding: '28px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border
  },
  infoContainerRight: {
    marginTop: '48px',
    padding: '28px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border,
    borderLeft: '1px solid '+colors.border
  },
  pricePair: {
  },
  pricePrice: {
  },
  smaller: {
    fontSize: '14px'
  }
});

class Calculator extends Component {

  constructor(props) {
    super();

    const generated = props.pendingCsdt ? props.pendingCsdt.generated : 0
    const collateral = props.pendingCsdt ? props.pendingCsdt.collateral : 0
    const collateralizationRatio = props.pendingCsdt ? props.pendingCsdt.collateralizationRatio : 0
    const liquidationPrice = props.pendingCsdt ? props.pendingCsdt.liquidationPrice : 0
    const currentPrice = props.pendingCsdt ? props.pendingCsdt.currentPrice : 0
    const maxGenerated = props.pendingCsdt ? props.pendingCsdt.maxGenerated : 0
    const calculationWarning = props.pendingCsdt ? props.pendingCsdt.calculationWarning : false
    const calculationError = props.pendingCsdt ? props.pendingCsdt.calculationError : false
    const interest = props.pendingCsdt ? props.interest : 0.7
    console.log(props)

    this.state = {
      csdtParameters: props.csdtParameters,
      csdtPrices: props.csdtPrices,
      collateral: collateral,
      generated: generated,
      interest: interest,
      collateralizationRatio: collateralizationRatio,
      minimumCollateralizationRatio: 150,
      currentPrice: currentPrice,
      liquidationPrice: liquidationPrice,
      maxGenerated: maxGenerated,
      warningCollateralizationRatio: 50,
      calculationWarning: calculationWarning,
      calculationError: calculationError
    };

    this.calculateRatios = this.calculateRatios.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validateOnBlur = this.validateOnBlur.bind(this)

    getCSDTParameters()
    getPrices()
    getInterest()
    getSupply()
    getStaking()
  };

  onChange(e) {
    const {
      minimumCollateralizationRatio
    } = this.state

    if(e.target.id === 'collateral') {
      const ratios = this.calculateRatios(e.target.value, 'uftm', this.state.generated, minimumCollateralizationRatio)

      this.setState({
        collateral: e.target.value,
        currentPrice: ratios.currentPrice,
        collateralizationRatio: ratios.collateralizationRatio,
        liquidationPrice: ratios.liquidationPrice,
        maxGenerated: ratios.maxGenerated
      })
    } else if(e.target.id === 'generated') {
      const ratios = this.calculateRatios(this.state.collateral, 'uftm', e.target.value, minimumCollateralizationRatio)

      this.setState({
        generated: e.target.value,
        currentPrice: ratios.currentPrice,
        collateralizationRatio: ratios.collateralizationRatio,
        liquidationPrice: ratios.liquidationPrice
      })
    } else {
      let st = {}
      st[e.target.id] = e.target.value
      this.setState(st)
    }

    setTimeout(this.validateOnBlur, 10)
  };

  validateOnBlur() {

    const {
      collateral,
      generated,
      generatedError,
      collateralizationRatio,
      minimumCollateralizationRatio,
      warningCollateralizationRatio
    } = this.state

    if(collateral && collateral !== "" && generated && generated !== "" && generated > 0) {

      this.setPendingCSDT()

      if(collateralizationRatio < minimumCollateralizationRatio) {
        this.setState({
          calculationError: 'Your collateral is below the minimum collateralization ratio',
        })

        return
      }
      if(collateralizationRatio < minimumCollateralizationRatio + warningCollateralizationRatio) {
        this.setState({
          calculationError: false,
          calculationWarning: 'Your collateral is at risk of being put up for auction'
        })

        return
      }
    }

    this.setState({
      calculationError: false,
      calculationWarning: false
    })
  };

  setPendingCSDT() {
    const {
      collateral,
      generated,
      collateralizationRatio,
      liquidationPrice,
      currentPrice,
      maxGenerated,
      calculationWarning,
      calculationError
    } = this.state

    const result = store.dispatch(actions.setPendingCSDT({
      collateral: collateral,
      generated: generated,
      collateralizationRatio: collateralizationRatio,
      liquidationPrice: liquidationPrice,
      currentPrice: currentPrice,
      maxGenerated: maxGenerated,
      calculationWarning: calculationWarning,
      calculationError: calculationError
    }))
  };

  render() {
    const { classes, interest, staking, supply } = this.props;
    const {
      collateral,
      generated,
      maxGenerated,
      collateralizationRatio,
      minimumCollateralizationRatio,
      currentPrice,
      liquidationPrice,
      calculationWarning,
      calculationError
    } = this.state

    let warningStyle = {}
    let errorStyle = {}

    if(calculationWarning) {
      warningStyle = {
        color: 'orange'
      }
    }
    if(calculationError) {
      errorStyle = {
        color: '#f44336'
      }
    }
    var _interest = 0.00
    if (interest) {
      _interest = (parseFloat(interest)*100).toFixed(2)
    }

    var recommended = (collateral*currentPrice/2)

    console.log(staking)
    console.log(supply)

    var bonded = 0
    var total = 0
    if (staking) {
      if (staking.staking) {
        if (staking.staking.staking) {
          bonded = parseInt(staking.staking.staking.bonded_tokens)
        }
      }
    }
    if (supply) {
      if (supply.supply) {
        if (supply.supply.supply) {
          if (supply.supply.supply[0].denom == "ucsdt") {
            total = supply.supply.supply[0].amount
          } else if (supply.supply.supply[1].denom == "ucsdt") {
            total = supply.supply.supply[1].amount
          }
        }
      }
    }
    console.log("-------------")
    console.log(bonded)
    console.log(total)

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={11} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>CSDT Portal</Typography>
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2" className={ classes.heading }>Collateralization calculator</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much UFTM would you like to collateralize?</Typography>
              <TextField
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="secondary"
                onChange={ this.onChange }
                value={ collateral }
                id="collateral"
                onBlur={ this.validateOnBlur }
                InputProps={{
                  endAdornment: <InputAdornment position="end">UFTM</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much UCSDT would you like to generate?</Typography>
              <TextField
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="secondary"
                onChange={ this.onChange }
                value={ generated }
                onBlur={ this.validateOnBlur }
                id="generated"
                InputProps={{
                  endAdornment: <InputAdornment position="end">UCSDT</InputAdornment>,
                }}
                helperText={"Max UCSDT available to generate: "+maxGenerated+" UCSDT"}
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Liquidation price (UFTM/UCSDT)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ liquidationPrice } UCSDT</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' }>Current price (UFTM/UCSDT)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ currentPrice ? currentPrice.toFixed(4) : 0.0000 } UCSDT</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Collateralization ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{ collateralizationRatio+'%'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Minimum ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{minimumCollateralizationRatio+'%'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Minimum APY (6%)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{(generated*0.06)+' UCSDT'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' }>Current Interest</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ _interest + '%' }</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Maximum APY (30%)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{(generated*0.3)+' UCSDT'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' }>Current APY</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' }>{(generated*_interest/100)+' UCSDT'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Staked</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{(bonded/1000000).toFixed(2)+' CSDT'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' }>Bonded %</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ (bonded/total*100).toFixed(2) + '%' }</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Total Supply</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{(total/1000000).toFixed(2)+' CSDT'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' }>Target Bonded</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' }>{'67%'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  calculateRatios(collateral, collateralDenom, generated, minimumCollateralizationRatio) {

    const { csdtPrices } = this.props

    let currentPrice = 0
    let liquidationPrice = 0
    let collateralizationRatio = 0
    let maxGenerated = 0
    let maxWithdraw = 0

    if(csdtPrices && csdtPrices.length > 0) {
      const price = csdtPrices.filter((price) => {
        return price.asset_code === collateralDenom
      })

      if(price.length > 0) {
        currentPrice = parseFloat(price[0].price)

        if(collateral && collateral !== "") {
          if(generated > 0) {
            collateralizationRatio = parseFloat(currentPrice * parseFloat(collateral) * 100 / generated).toFixed(4)
            maxWithdraw = Math.floor((collateral - (collateral * minimumCollateralizationRatio / collateralizationRatio))).toFixed(0)
            liquidationPrice = (minimumCollateralizationRatio * currentPrice / collateralizationRatio).toFixed(4)
          }

          maxGenerated = Math.floor(((collateral * currentPrice * 100 / minimumCollateralizationRatio) - generated)).toFixed(0)
        }

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
  };
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { csdts, prices, interest, supply, staking } = state;
  return {
    csdtParameters: csdts.csdtParameters,
    pendingCsdt: csdts.pendingCsdt,
    csdtPrices: prices.prices,
    interest: interest.interest.interest,
    staking: staking,
    supply: supply,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Calculator)))
