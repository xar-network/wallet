import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import NoCSDTs from './noCSDTs'
import OpenCSDT from './openCSDT'
import Account from '../account'

const styles = theme => ({
  container: {
    backgroundColor: colors.card,
    width: '100%',
    height: '100%'
  },
  maxHeight: {
    height: '100%'
  }
});

class Cdp extends Component {

  render() {
    const { classes, match } = this.props;

    return (
      <Grid
        className={classes.container}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={9} className={classes.maxHeight}>
          { this.renderScreen(match.params.view) }
        </Grid>
        <Grid item xs={12} md={3} className={classes.maxHeight}>
          <Account action={ 'unlocked' } />
        </Grid>
      </Grid>
    )
  }

  renderScreen(view) {
    switch (view) {
      case 'open':
        return <OpenCSDT />
      default:
        return <NoCSDTs />
    }
  }
}

Cdp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state)
  const { accounts } = state;
  return {
    accounts: accounts
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Cdp)))
