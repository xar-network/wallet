import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center">
        <Grid item className={classes.instruction}>
          <Typography variant="body1">Create Keystore File + Password</Typography>
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
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="Confirm Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
          <Button
            onClick={() => this.nextPath('/home/create/2') }
            variant="outlined"
            size='large'
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
};

export default withRouter(connect()(withStyles(styles)(Step1)))
