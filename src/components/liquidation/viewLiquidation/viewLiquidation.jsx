import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {

  },
});

class Liquidation extends Component {

  render() {
    const { classes, match, loading } = this.props;

    return (
      <Grid
        className={classes.container}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
      
      </Grid>
    )
  }
}

Liquidation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader } = state;
  return {
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Liquidation)))
