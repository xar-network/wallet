import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({

});

class AccountOptions extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes, loading } = this.props;
    const {
      amount,
      destination
    } = this.state

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}>
        <Grid item>
          <TextField
            fullWidth
            label="Amount"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="amount"
            value={ amount }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Destination"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="destination"
            value={ destination }
            onChange={ this.onChange }
            onKeyDown={ this.handleKeyDown }
            disabled={ loading }
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => this.onContinue() }
            variant="outlined"
            size='large'
            disabled={ loading }
            >
              Send
            </Button>
        </Grid>
      </Grid>
    )
  }
}

AccountOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(AccountOptions)))
