import React, { Component } from 'react'
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { unlockAccount, startLoader, stopLoader } from '../../store/service';

const styles = theme => ({
  container: {

  },
});

class PasswordModal extends Component {

  constructor(props) {
    super();
    this.state = {
      password: "",
      passwordError: false,
      loading: false
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown(e) {
    if (e.which === 13) {
      this.onSubmit();
    }
  };

  async onSubmit() {
    this.setState({ loading: true })
    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)
    const keyStoreOjb = JSON.parse(userOjb.keystore)

    startLoader()

    const response = await unlockAccount({ password: this.state.password, keystore: keyStoreOjb })

    stopLoader()

    if(response.account != null && response.account.privateKey) {
      this.props.onSubmit(response.account.privateKey)
    } else {
      this.setState({ passwordError: true, loading: false })
    }
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  render() {

    const { classes } = this.props

    const {
      loading,
      password,
      passwordError
    } = this.state

    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        className={ classes.container }
      >
        <DialogTitle id="form-dialog-title">Password signature</DialogTitle>
        <DialogContent>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start">
            <Grid item xs={12}>
              <Typography variant='body1'>Please enter your password to sign the transaction</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="normal"
                variant="outlined"
                color="secondary"
                onChange={ this.onChange }
                value={ password }
                id="password"
                type="password"
                error={ passwordError }
                onKeyDown={ this.onKeyDown }
                disabled={ loading }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size='medium'
            color='primary'
            onClick={ this.onSubmit }
            disabled={ loading }
            >
              Submit
          </Button>
        </DialogActions>
      </Dialog >
    )
  }
}


PasswordModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(PasswordModal))
