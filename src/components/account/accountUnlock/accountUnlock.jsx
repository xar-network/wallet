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
    height: 'calc(100% - 81px)'
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
  }
});

class AccountUnlock extends Component {

  constructor(props) {
    super();
    this.state = {
      error: null,
      password: '',
      keystore: '',
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

    if(!password || !keystore) {
      return false
    }

    try {
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

  render() {
    const { classes, loading } = this.props;
    const { password, fileName, error } = this.state

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
        <Grid item xs={12} className={classes.actions}>
          <Grid
            container
            direction="column"
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
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
              <Button
                onClick={() => this.onContinue() }
                variant="outlined"
                size='large'
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
