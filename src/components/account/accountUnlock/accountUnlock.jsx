import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
  }
});

class AccountUnlock extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;

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
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} align={'left'}>
              <Button
                fullWidth
                onClick={() => { }}
                variant="outlined"
                size='large'
                >
                  Upload Keystore File
                </Button>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
              <Button
                onClick={() => this.nextPath('/cdp') }
                variant="outlined"
                size='large'
                >
                  Continue
                </Button>
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

export default withRouter(connect()(withStyles(styles)(AccountUnlock)))
