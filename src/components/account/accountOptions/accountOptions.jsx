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

class AccountOptions extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes, nodeInfo } = this.props;

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
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={4}>
            <Grid item >
              <Typography variant="body1">Get started by unlocking your wallet</Typography>
            </Grid>
            <Grid item xs={11}>
              <Button
                fullWidth
                onClick={() => this.nextPath('/home/unlock/1') }
                variant="outlined"
                size='large'
                >
                  Unlock with keystore
                </Button>
            </Grid>
            <Grid item xs={11}>
              <Button
                fullWidth
                  onClick={() => this.nextPath('/home/convert/1') }
                variant="outlined"
                size='large'
                >
                  Unlock with mnemonic
                </Button>
            </Grid>
            <Grid item xs={11}>
              <Button
                fullWidth
                onClick={() => this.nextPath('/home/create/1') }
                variant="outlined"
                size='large'
              >
                Create wallet
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
