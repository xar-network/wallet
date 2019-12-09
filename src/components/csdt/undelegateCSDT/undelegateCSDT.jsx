import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core'
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
  },
  textField: {
    width: '350px'
  },
  select: {
    marginTop: '16px'
  }
});

class UndelegateCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      amount: 0,
      amountError: false,
      recipient: '',
      recipientError: false,
      balances: props.balances,
    };

    this.onChange = this.onChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.calculateDelegatedBalance = this.calculateDelegatedBalance.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  onSelectChange(e) {
    let st = {}
    st[e.target.name] = e.target.value
    this.setState(st)
  };

  onSubmit() {
    this.props.onSubmit({ amount: this.state.amount, recipient: this.state.recipient })
  };

  calculateDelegatedBalance(validatorAddress) {
    const { delegations } = this.props

    if(!delegations) {
      return 0
    }

    return delegations.filter((delegation) => {
      if(!validatorAddress && validatorAddress !== "") {
        return true
      }

      return delegation.validator_address === validatorAddress
    }).reduce((total, delegation) => {
      return parseInt(total) + parseInt(delegation.balance.amount);
    }, 0)
  }

  calculateBalance() {
    const { balances } = this.props

    if(!balances || balances.length === 0) {
      return 0
    }

    let bal = balances.filter((balance) => {
      return balance.denom === 'ucsdt'
    })

    if(!bal || bal.length === 0) {
      return 0
    }

    return bal[0].amount
  }

  render() {
    const { classes, onClose, csdt, loading, validators } = this.props;
    const {
      amount,
      amountError,
      recipient,
      recipientError,
    } = this.state

    const generatedDenom =  csdt && csdt.debt && csdt.debt.length > 0 ? csdt.debt[0].denom : 'Unknown'

    const currentBalance = this.calculateBalance()
    const delegatedBalance = this.calculateDelegatedBalance()
    const currentValidatoroBalance = this.calculateDelegatedBalance(recipient)

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={10} className={classes.header}>
          <Typography variant="h2" className={ classes.title }>Undelegate {generatedDenom}</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <CloseIcon onClick={onClose} className={ classes.closeButton }/>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1">How much {generatedDenom} would you like to undelegate?</Typography>
          <TextField
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            onChange={ this.onChange }
            value={ amount }
            id="amount"
            error={ amountError }
            disabled={ loading }
            InputProps={{
              endAdornment: <InputAdornment position="end">{generatedDenom}</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <FormControl variant="outlined" className={classes.textField}>
            <Typography variant="body1">Which validator would you like to delegate to?</Typography>
            <Select
              className={classes.select}
              labelId="recipient"
              id="recipient"
              name="recipient"
              value={recipient}
              error={recipientError}
              onChange={this.onSelectChange}
            >
              {
                (validators && validators.length > 0) && validators.filter((validator) => {
                  return (!['0503F79A2B10BC4B', 'A80787E4CC6AA8B5'].includes(validator.description.identity))
                }).map((validator) => {
                  return (
                    <MenuItem value={validator.operator_address}>
                      {validator.description.moniker}
                    </MenuItem>)
                })
              }
            </Select>
            <FormHelperText>{ <a style={{ color: "#9aa3ad" }} target="_blank" href="https://explorer.xar.network/validators">Click here to view the current validator list</a> }</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1" className={ classes.infoTitle }>Current {generatedDenom.toUpperCase()} balance</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ currentBalance + ' ' + generatedDenom }</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Total delegated balance</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ delegatedBalance + ' ' + generatedDenom }</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Delegated balance at validator</Typography>
          <Typography variant="h3" className={ classes.infoValue }>{ currentValidatoroBalance + ' ' + generatedDenom }</Typography>
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
              Undelegate
          </Button>
        </Grid>
      </Grid>
    )
  }
}

UndelegateCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, csdts, prices, loader, staking } = state;
  return {
    balances: accounts.balances,
    csdt: csdts.csdt,
    csdtParameters: csdts.csdtParameters,
    loading: loader.loading,
    csdtPrices: prices.prices,
    validators: staking.validators,
    delegations: staking.delegations
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(UndelegateCSDT)))
