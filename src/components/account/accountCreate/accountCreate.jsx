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
    height: 'calc(100% - 153px)'
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

class AccountCreate extends Component {

  constructor(props) {
    super();
    this.state = {
      step: 1,
    };

    this.setStep = this.setStep.bind(this)
  }

  setStep(step){
    this.setState({step: step})
  }

  render() {
    const { classes, match, nodeInfo } = this.props;

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
          { this.renderStep() }
        </Grid>
      </Grid>
    )
  }

  renderStep() {
    const { step } = this.state

    switch (step) {
      case '1':
        return <Step1 setFlow={ this.props.setFlow } setStep={ this.setStep } />
      case '2':
        return <Step2 setStep={ this.setStep } />
      case '3':
        return <Step3 setStep={ this.setStep } />
      case '4':
        return <Step4 setFlow={ this.props.setFlow } setStep={ this.setStep } />
      default:
        return <Step1 setFlow={ this.props.setFlow } setStep={ this.setStep } />
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
