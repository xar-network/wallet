import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unlockAccount, startLoader, stopLoader, getCSDT } from '../../../store/service';

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
  actions: {
    flex: '1',
    padding: '30px',
    backgroundColor: '#152128',
    height: 'calc(100% - 153px)'
  },
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
  input: {
    display: 'none',
  },
  error: {
    color: colors.red
  },
  network: {
    padding: '24px',
    backgroundColor: colors.background,
    borderBottom: '1px solid '+colors.border,
    borderTop: '1px solid '+colors.border,
    margin: '0 auto'
  },
  dot: {
    height: '10px',
    width: '10px',
    backgroundColor: colors.green,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '6px'
  },
  inline: {
    display: 'inline-block'
  },
});

class AccountUnlock extends Component {

  constructor(props) {
    super();
    this.state = {
      error: null,
      password: '',
      passwordError: false,
      keystore: '',
      keystoreError: false,
      fileName: null,
    };

    this.onChange = this.onChange.bind(this)
    this.onUploadKeystoreFile = this.onUploadKeystoreFile.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  onUploadKeystoreFile(e) {
    var file = document.getElementById("text-button-file").files[0];
    if (file) {

      if(!file.type === 'application/json') {
        this.setState({ err: 'Invalid file' });
        return false
      }

      const that = this

      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        //validate file is json
        that.setState({ keystore: evt.target.result, fileName: file.name });
      }
      reader.onerror = function (evt) {
        that.setState({ err: 'Invalid file' });
      }
    }
  }

  async onContinue() {
    const {
      password,
      keystore
    } = this.state

    let error = false

    if(!keystore || keystore === '') {
      this.setState({ keystoreError: 'Keystore is required' })
      error = true
    }

    if(!password || password === '') {
      this.setState({ passwordError: 'Password is required' })
      error = true
    }

    if(error) {
      return false
    }

    try {

      this.setState({ passwordError: false, keystoreError: false })

      startLoader()
      const response = await unlockAccount({ password, keystore })
      stopLoader()

      if(response.account != null && response.account.privateKey) {

        const obj = {
          address: response.account.address,
          keystore: keystore
        }

        getCSDT({ address: response.account.address, denom: 'uftm' })

        sessionStorage.setItem('xar-csdt-user', JSON.stringify(obj))

        if(this.props.pendingCsdt) {
          this.nextPath('/csdt/open')
        } else {
          this.nextPath('/csdt')
        }

        this.props.setFlow('unlocked')
      } else {
        this.setState({ error: 'Invalid keystore + password combination' })
      }

    } catch(ex) {
      stopLoader()
      this.setState({ error: 'Invalid keystore + password combination' })
    }
  }

  onChange(e, val) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      this.onContinue();
    }
  }

  onBack() {
    this.props.setFlow('options')
  }

  render() {
    const { classes, loading, nodeInfo } = this.props;
    const { password, fileName, error, keystoreError, passwordError } = this.state

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
            direction="column"
            justify="flex-start"
            alignItems="center">
            <Grid item>
              <Typography variant="h2">Connect your Wallet</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.network} align={ 'center' }>
          <div className={ classes.dot }> </div>
          <Typography variant="body2" align={ "center" } className={ classes.inline }>{ (nodeInfo && nodeInfo.node_info) ? nodeInfo.node_info.network : 'Unknown' }</Typography>
        </Grid>
        <Grid item xs={12} className={classes.actions}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start">
            <Grid item className={classes.instruction}>
              <Typography variant="body1">Unlock your account using Keystore File + Password</Typography>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} align={'left'}>
              <input
                accept="application/JSON"
                className={ classes.input }
                id="text-button-file"
                type="file"
                disabled={ loading }
                onChange={ this.onUploadKeystoreFile }
              />
              <label htmlFor="text-button-file">
                <Button
                  component="span"
                  fullWidth
                  variant="outlined"
                  size='large'
                  accept="application/JSON"
                  disabled={ loading }
                  helperText={ keystoreError }
                  error={ keystoreError }
                  >
                    { fileName || "Upload Keystore File" }
                  </Button>
              </label>
            </Grid>
            <Grid item xs={12} className={classes.inputContainer}>
              <TextField
                fullWidth
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                color="secondary"
                id="password"
                value={ password }
                onChange={ this.onChange }
                onKeyDown={ this.handleKeyDown }
                disabled={ loading }
                helperText={ passwordError }
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
                onClick={() => this.onContinue() }
                variant="contained"
                color='primary'
                size='small'
                disabled={ loading }
                >
                  Continue
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
              <Typography className={ classes.error }>{ error }</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

AccountUnlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, csdts, loader } = state;
  return {
    account: accounts.account,
    pendingCsdt: csdts.pendingCsdt,
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccountUnlock)))
