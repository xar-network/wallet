import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

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
  }
});

class AccountCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, match } = this.props;

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
            alignItems="center">
            <Grid item xs={12}>
              { this.renderStep(match.params.step) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderStep(step) {
    switch (step) {
      case '1':
        return <Step1 />
      case '2':
        return <Step2 />
      case '3':
        return <Step3 />
      case '4':
        return <Step4 />
      default:
        return <Step1 />
    }
  }
}

AccountCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts } = state;
  return {
    accounts: accounts
  };
};


export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccountCreate)))
