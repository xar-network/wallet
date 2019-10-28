import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
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
          <Typography variant="body1" align="center">Please confirm the following words in your mnemonic phrase</Typography>
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#9"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#16"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#18"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
          <Button
            onClick={() => this.nextPath('/home/create/4') }
            variant="outlined"
            size='large'
            >
              Confirm
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
