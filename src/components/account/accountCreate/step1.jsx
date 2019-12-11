import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount, stopLoader, startLoader } from '../../../store/service';

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
      password,
      confirmPassword
    } = this.state

    if(!password || !confirmPassword) {
      return false
    }

    if(password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' })
      return false
    }

    startLoader()

    const response = await createAccount({ password, confirmPassword })

    //add error checking
    this.download(response.account.keystore.id+'_keystore.json', JSON.stringify(response.account.keystore))

    stopLoader()

    this.nextPath('/home/create/2')
  }

  onBack() {
    this.nextPath('/home')
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

  handleKeyDown(event) {
    if (event.which === 13) {
      this.downloadKeystoreFile();
    }
  };

  render() {
    const { classes, loading } = this.props;
    const { password, confirmPassword } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start">
        <Grid item className={classes.instruction}>
          <Typography variant="body1">Create Keystore File + Password</Typography>
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
