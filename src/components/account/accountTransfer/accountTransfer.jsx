import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { send, stopLoader, startLoader } from '../../../store/service/api';

import PasswordModal from '../../passwordModal'

const styles = theme => ({
  container: {
    padding: '24px'
  },
  button: {
    marginTop: '12px'
  }
});

class AccountTransfer extends Component {

  constructor(props) {
    super();

    this.state = {
      destination: '',
      destinationError: false,
      amount: "",
      amountError: false,
      privateKeyModalOpen: false
    };

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.getBalance = this.getBalance.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.validateSend = this.validateSend.bind(this)
  };

  onChange(e) {

    if(e.target.id === 'amount') {
      if(isNaN(e.target.value)) {
        return false
      }
    }

    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      this.onContinue();
    }
  };

  getBalance(collateralDenom) {
    const bal = (this.props.balances && this.props.balances.length > 0) ? this.props.balances.filter((balance) => {
      return balance.denom === collateralDenom
    }) : null

    if(bal && bal.length > 0) {
      return bal[0]
    } else {
      return {}
    }
  };

  showPrivateKeyModal() {
    this.setState({ privateKeyModalOpen: true })
  }

  async submitPrivateKey(signingKey) {
    this.setState({ privateKeyModalOpen: false })
    startLoader()

    const { amount, destination } = this.state
    const { sendDenom } = this.props;

    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)

    const sendResult = await send({
      privateKey: signingKey,
      fromAddress: userOjb.address,
      toAddress: destination,
      amount: amount,
      denom: sendDenom
    })

    let snackbarObj = {}

    if(sendResult && sendResult.result && sendResult.result.raw_log && sendResult.result.raw_log.includes('"success":true')) {
      snackbarObj = { snackbarMessage: 'TX: ' + sendResult.result.txhash, snackbarType: 'Success'}
    } else {
      const rawLog = JSON.parse(sendResult.result.raw_log)

      if(rawLog && rawLog.message) {
        snackbarObj = { snackbarMessage: rawLog.message, snackbarType: 'Error'}
      } else {
        snackbarObj = { snackbarMessage: 'An error occurred', snackbarType: 'Error'}
      }
    }

    stopLoader()

    this.props.cancelSendClicked(snackbarObj)
  }

  closePrivateKeyModal() {
    this.setState({ privateKeyModalOpen: false })
  }

  renderPrivateKeyModal() {
    return <PasswordModal onSubmit={ this.submitPrivateKey } onClose={ this.closePrivateKeyModal } />
  }

  onContinue() {
    if(this.validateSend()) {
      this.showPrivateKeyModal()
    }
  };

  validateSend() {
    const {
      destination,
      amount
    } = this.state

    let returnVal = true;

    if(!destination || destination === "") {
      this.setState({ destinationError: true})
      returnVal = false
    } else {
      this.setState({ destinationError: false})
    }

    if(!amount || amount === "" || amount <= 0 || isNaN(amount)) {
      this.setState({ amountError: true})
      returnVal = false
    } else {
      this.setState({ amountError: false})
    }

    return returnVal
  };

  onCancel() {
    this.props.cancelSendClicked()
  };

  render() {
    const { classes, loading, sendDenom } = this.props;
    const {
      amount,
      amountError,
      destination,
      destinationError,
      privateKeyModalOpen
    } = this.state

    const balance = this.getBalance(sendDenom)

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Destination"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="destination"
            value={ destination }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
            placeholder='xar123...'
            error={ destinationError }
          />
        </Grid>
        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Amount"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="amount"
            value={ amount }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
            placeholder='0'
            helperText={'Available balance: '+ (balance ? balance.amount : '0') +' '+sendDenom}
            error={ amountError }
            InputProps={{
              endAdornment: <InputAdornment position="end">{sendDenom}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            className={ classes.button }
            fullWidth
            onClick={() => this.onCancel() }
            variant="text"
            size='small'
            disabled={ loading }
            >
              Cancel
            </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className={ classes.button }
            fullWidth
            onClick={() => this.onContinue() }
            variant="contained"
            size='small'
            color='primary'
            disabled={ loading }
            >
              Send
            </Button>
        </Grid>
        { privateKeyModalOpen && this.renderPrivateKeyModal() }
      </Grid>
    )
  }
}

AccountTransfer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  const { accounts, loader } = state;
  return {
    account: accounts.account,
    balances: accounts.balances,
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccountTransfer)))
