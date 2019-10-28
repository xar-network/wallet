import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core'
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
  }
});

class AccountOptions extends Component {

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
            alignItems="center"
            spacing={4}>
            <Grid item >
              <Typography variant="body1">Get started by unlocking your wallet</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => this.nextPath('/home/unlock/1') }
                variant="outlined"
                size='large'
                >
                  Unlock Wallet
                </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => this.nextPath('/home/create/1') }
                variant="outlined"
                size='large'
              >
                Create Wallet
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

AccountOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(AccountOptions)))
