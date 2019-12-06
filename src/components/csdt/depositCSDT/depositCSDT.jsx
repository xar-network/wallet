import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    padding: '30px'
  },
  closeButton: {
    cursor: 'pointer'
  },
  title: {
    marginBottom: '32px'
  },
  button: {
    marginTop: '32px'
  },
  infoTitle: {
    marginTop: '12px'
  },
  infoValue: {
    marginTop: '6px'
  },
  sepperate: {
    marginTop: '32px'
  }
});

class DepositCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      collateral: 0,
      collateralError: false,
      minCollateral: 50,
      balances: props.balances,
      minimumCollateralizationRatio: 150
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getBalance = this.getBalance.bind(this)
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  getBalance(collateralDenom) {
    const bal = this.props.balances ? this.props.balances.filter((balance) => {
      return balance.denom === collateralDenom
    }) : null

    if(bal && bal.length > 0) {
      return bal[0]
    } else {
      return {}
    }
  };

  onSubmit() {
    this.props.onSubmit({ collateral: this.state.collateral })
  };

  render() {
    const { classes, onClose, calculateRatios, csdt, loading } = this.props;
    const {
      collateral,
      collateralError,
      minCollateral,
      minimumCollateralizationRatio
    } = this.state

    const currentCollateral = csdt && csdt.collateral_amount && csdt.collateral_amount.length > 0 ? csdt.collateral_amount[0].amount : 0
    const collateralDenom =  csdt && csdt.collateral_amount && csdt.collateral_amount.length > 0 ? csdt.collateral_amount[0].denom : 'Unknown'
    const generated = csdt && csdt.debt && csdt.debt.length > 0 ? csdt.debt[0].amount : 'N/A'
    const generatedDenom =  csdt && csdt.debt && csdt.debt.length > 0 ? csdt.debt[0].denom : 'Unknown'

    const ratios = calculateRatios(parseFloat(collateral) + parseFloat(currentCollateral), collateralDenom, generated, minimumCollateralizationRatio)
    const balance = this.getBalance(collateralDenom)

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={10} className={classes.header}>
          <Typography variant="h2" className={ classes.title }>Deposit Collateral</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <CloseIcon onClick={onClose} className={ classes.closeButton }/>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1">How much {collateralDenom} would you like to deposit?</Typography>
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
              endAdornment: <InputAdornment position="end">{collateralDenom}</InputAdornment>
            }}
            helperText={"Min. "+collateralDenom+" required: "+minCollateral+" "+collateralDenom}
          />
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1" className={ classes.infoTitle }>Current account balance</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ balance.amount + ' ' + balance.denom }</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Current price information ({collateralDenom}/{generatedDenom})</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ ratios.currentPrice + ' ' + generatedDenom }</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Projected liquidation price ({collateralDenom}/{generatedDenom})</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ ratios.liquidationPrice + ' ' + generatedDenom }</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Projected collateralization ratio</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ ratios.collateralizationRatio }%</Typography>
        </Grid>
        <Grid item xs={6} className={ classes.sepperate }>
          <Button
            className={ classes.button }
            variant="contained"
            size='medium'
            color='secondary'
            onClick={onClose}
            disabled={loading}
            >
              Cancel
          </Button>
        </Grid>
        <Grid item xs={6} align="right" className={ classes.sepperate }>
          <Button
            className={ classes.button }
            variant="contained"
            size='medium'
            color='primary'
            onClick={this.onSubmit}
            disabled={loading}
            >
              Deposit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

DepositCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, csdts, prices, loader } = state;
  return {
    balances: accounts.balances,
    csdt: csdts.csdt,
    csdtParameters: csdts.csdtParameters,
    loading: loader.loading,
    csdtPrices: prices.prices,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DepositCSDT)))
