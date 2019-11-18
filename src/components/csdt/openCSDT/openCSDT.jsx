import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
    fontSize: '14px'
  }
});

class OpenCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      collateral: 0,
      collateralError: false,
      generated: 0,
      generatedError: false,
      minCollateral: 0.5,
      maxGenerated: 0,
      collateralizationRatio: 0,
      minimumCollateralizationRatio: 150,
      conversionRatio: 2 //FTM / CSDT
    };

    this.onChange = this.onChange.bind(this)
    this.validateCollateral = this.validateCollateral.bind(this)
    this.validateGenerated = this.validateGenerated.bind(this)
  }

  onChange(e) {

    const {
      conversionRatio,
      minimumCollateralizationRatio
    } = this.state

    if(e.target.id === 'collateral') {
      if(!this.validateCollateral(e.target.value))  {
        return false
      }

      const maxGenerated = (e.target.value * (1/conversionRatio) * 100 / minimumCollateralizationRatio).toFixed(2)
      if(this.state.generated > 0) {
        const collateralizationRatio = e.target.value * (1/conversionRatio) * 100 / this.state.generated
        this.setState({ maxGenerated: maxGenerated, collateralizationRatio: collateralizationRatio })
      } else {
        this.setState({ maxGenerated: maxGenerated, collateralizationRatio: 0 })
      }
    }

    if(e.target.id === 'generated') {
      if(!this.validateGenerated(e.target.value))  {
        return false
      }

      if(e.target.value > 0) {
        const collateralizationRatio = this.state.collateral * (1/conversionRatio) * 100 / e.target.value
        this.setState({ collateralizationRatio: collateralizationRatio })
      }
    }

    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
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
      conversionRatio,
      minimumCollateralizationRatio
    } = this.state

    if(!val) {
      val = generated
    }

    if(isNaN(val)) {
      return false
    }
    this.setState({ generatedError: false })

    if(val > (collateral * (1/conversionRatio) * 100 / minimumCollateralizationRatio)) {
      this.setState({ generatedError: 'Amount exceeds maximum generated CSDT' })
    }

    return true
  }

  nextPath(path) {
    this.props.history.push(path);
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
      minimumCollateralizationRatio
    } = this.state

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
              <Typography variant="h2" className={ classes.heading }>Collateralize & Generate FTM</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much FTM would you like to collateralize?</Typography>
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
                  endAdornment: <InputAdornment position="end">FTM</InputAdornment>,
                }}
                helperText={"Min. FTM required: "+minCollateral+" FTM"}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much ZAR would you like to generate?</Typography>
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
                  endAdornment: <InputAdornment position="end">CSDT</InputAdornment>,
                }}
                helperText={"Max CSDT available to generate: "+maxGenerated+" CSDT"}
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Liquidation price (FTM/USD)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>1.4 USD</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Current price information (FTM/USD)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>2.8 USD</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Liquidation penalty</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>13.000%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Collateralization ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ collateralizationRatio+'%'}</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Minimum ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>{minimumCollateralizationRatio+'%'}</Typography>
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
                onClick={() => this.nextPath('/csdt/confirm')}
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

export default withRouter(connect()(withStyles(styles)(OpenCSDT)))
