import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../../store/';
import * as actions from '../../../store/actions';

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
    marginTop: '6px'
  }
});

class OpenCSDT extends Component {

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

    this.state = {
      collateral: collateral,
      collateralError: false,
      generated: generated,
      generatedError: false,
      minCollateral: 50,
      maxGenerated: maxGenerated,
      collateralizationRatio: collateralizationRatio,
      minimumCollateralizationRatio: 150,
      warningCollateralizationRatio: 50,
      currentPrice: currentPrice,
      liquidationPrice: liquidationPrice,
      calculationWarning: calculationWarning,
      calculationError: calculationError
    };

    this.onChange = this.onChange.bind(this)
    this.validateCollateral = this.validateCollateral.bind(this)
    this.validateGenerated = this.validateGenerated.bind(this)
    this.submitCollateralize = this.submitCollateralize.bind(this)
    this.validateOnBlur = this.validateOnBlur.bind(this)
  }

  onChange(e) {

    const {
      minimumCollateralizationRatio
    } = this.state

    if(e.target.id === 'collateral') {
      if(!this.validateCollateral(e.target.value))  {
        return false
      }

      const ratios = this.props.calculateRatios(e.target.value, 'uftm', this.state.generated, minimumCollateralizationRatio)

      this.setState({
        collateral: e.target.value,
        currentPrice: ratios.currentPrice,
        collateralizationRatio: ratios.collateralizationRatio,
        liquidationPrice: ratios.liquidationPrice,
        maxGenerated: ratios.maxGenerated
      })
    } else if(e.target.id === 'generated') {
      if(!this.validateGenerated(e.target.value))  {
        return false
      }

      const ratios = this.props.calculateRatios(this.state.collateral, 'uftm', e.target.value, minimumCollateralizationRatio)

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

  validateCollateral(val) {
    const {
      collateral,
      minCollateral
    } = this.state

    if(!val) {
      val = collateral
    }

    if(isNaN(val)) {
      return false
    }

    this.setState({ collateralError: false })

    if(val < minCollateral) {
      this.setState({ collateralError: 'Amount is less than minimum collateral' })
    }

    return true
  }

  validateGenerated(val) {
    const {
      collateral,
      generated,
      maxGenerated,
      minimumCollateralizationRatio
    } = this.state

    if(!val) {
      val = generated
    }

    if(isNaN(val)) {
      return false
    }
    this.setState({ generatedError: false })

    if(val > (1*maxGenerated)) {
      this.setState({ generatedError: 'Amount exceeds maximum generated UCSDT' })
    }

    return true
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  submitCollateralize() {
    if(this.validateCollateral() && this.validateGenerated()) {

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

      this.nextPath('/csdt/confirm')
    }
  }

  render() {
    const { classes } = this.props;
    const {
      collateral,
      collateralError,
      generated,
      generatedError,
      minCollateral,
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
        <Grid item xs={11} className={classes.body}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2" className={ classes.heading }>Collateralize UFTM & Generate UCSDT</Typography>
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
                error={ collateralError }
                InputProps={{
                  endAdornment: <InputAdornment position="end">UFTM</InputAdornment>,
                }}
                helperText={"Min. UFTM required: "+minCollateral+" UFTM"}
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
                id="generated"
                error={ generatedError }
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
                  <Typography variant={ 'body1' } className={ classes.smaller }>Current price information (UFTM/UCSDT)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>{ currentPrice ? currentPrice.toFixed(4) : 0.0000 } UCSDT</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Liquidation penalty</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>0.000%</Typography>
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
                  <Typography variant={ 'body1' } className={ classes.smaller } style={{ ...warningStyle, ...errorStyle }}>Minimum ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller } style={{ ...warningStyle, ...errorStyle }}>{minimumCollateralizationRatio+'%'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Stability Fee</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>0.000%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={ classes.back }
                onClick={() => this.nextPath('/csdt')}
                variant="contained"
                size='medium'
                color='secondary'
                >
                  Back
              </Button>
              <Button
                className={ classes.openCSDT }
                onClick={ this.submitCollateralize }
                variant="contained"
                size='medium'
                color='primary'
                >
                  Collateralize and Generate
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

OpenCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { csdts, prices } = state;
  return {
    pendingCsdt: csdts.pendingCsdt,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(OpenCSDT)))
