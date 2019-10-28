import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  instruction: {
    marginBottom: '30px'
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
        alignItems="center"
        spacing={2}>
        <Grid item xs={12} className={classes.instruction}>
          <Typography variant="body1" align="center">You are all set</Typography>
        </Grid>
        <Grid item xs={12} className={classes.instruction}>
          <Typography variant="body1" align="center">Your account is set up, you can now unlock it to use the CDP portal</Typography>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align={'center'}>
          <Button
            onClick={() => this.nextPath('/home/unlock/1') }
            variant="outlined"
            size='large'
            >
              Unlock Wallet
            </Button>
        </Grid>
      </Grid>
    )
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Step1)))
