import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount, createAccountWithMneomnic, getCSDT, startLoader, stopLoader } from '../../../store/service';

const styles = theme => ({
  instruction: {
    paddingBottom: '30px'
  },
  inputContainer: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '16px'
  },
  textArea: {

  }
});

class Step1 extends Component {

  constructor(props) {
    super();
    this.state = {
      error: null,
      password: '',
      confirmPassword: '',
      keystore: null
    };

    this.onChange = this.onChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  async downloadKeystoreFile() {
    const {
      mnemonic,
      password,
      confirmPassword
    } = this.state

    this.setState({ error: false, mnemonicError: false, passwordError: false })

    if(!mnemonic) {
      this.setState({ error: 'Invalid mnemonic', mnemonicError: true })
      return false
    }

    if(!password || !confirmPassword) {
      this.setState({ error: 'Invalid passwords', passwordError: true })
      return false
    }

    const mnemonicSplit = mnemonic.split(' ')

    if(mnemonicSplit.length != 24) {
      this.setState({ error: 'Invalid mnemonic', mnemonicError: true })
      return false
    }

    if(password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match', passwordError: true })
      return false
    }

    startLoader()

    const response = await createAccountWithMneomnic({ mnemonic, password })

    let keystore = JSON.parse(response.account.keystore)

    //add error checking
    this.download(keystore.id+'_keystore.json', response.account.keystore)

    const obj = {
      address: response.account.address,
      keystore: response.account.keystore
    }

    await getCSDT({ address: response.account.address, denom: 'uftm' })

    sessionStorage.setItem('xar-csdt-user', JSON.stringify(obj))

    stopLoader()

    if(this.props.pendingCsdt) {
      this.nextPath('/csdt/open')
    } else {
      this.nextPath('/csdt')
    }

    this.props.setFlow('unlocked')
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  onChange(e, val) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  }

  onBack() {
    this.props.setFlow('options')
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      this.downloadKeystoreFile();
    }
  };

  render() {
    const { classes, loading } = this.props;
    const { password, confirmPassword, passwordError, mnemonic, mnemonicError, error } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center">
        <Grid item xs={12} className={classes.instruction}>
          <Typography variant="body1">Create Keystore File + Password</Typography>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            autoFocus
            fullWidth={true}
            id="mnemonic"
            label="Mnemonic"
            className={classes.textArea}
            margin="normal"
            variant="outlined"
            color="secondary"
            multiline={true}
            value={ mnemonic }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
            error={ mnemonicError }
            helperText={ mnemonicError ? error : '' }
          />
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            color="secondary"
            value={ password }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
            error={ passwordError }
            helperText={ passwordError ? error : '' }
          />
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            color="secondary"
            value={ confirmPassword }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
            error={ passwordError }
          />
        </Grid>
        <Grid item xs={6} className={classes.buttonContainer} align={'left'}>
          <Button
            onClick={() => this.onBack() }
            variant="text"
            size='small'
            disabled={ loading }
            >
              Back
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.buttonContainer} align={'right'}>
          <Button
            onClick={() => this.downloadKeystoreFile() }
            variant="contained"
            color='primary'
            size='small'
            disabled={ loading }
            >
              Download Keystore
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired,
  accounts: PropTypes.object
};

const mapStateToProps = state => {
  const { accounts, loader } = state;
  return {
    accounts: accounts,
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Step1)))
