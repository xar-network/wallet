import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import Calculator from '../calculator'
import Account from '../account'
import Loader from '../loader'

const styles = theme => ({
  container: {
    backgroundColor: colors.card,
    width: '100%',
    height: '100%'
  },
  maxHeight: {
    height: '100%',
    minHeight: '100%'
  }
});

class Home extends Component {

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
        <Grid item xs={12} md={9} className={classes.maxHeight}>
          <Calculator />
        </Grid>
        <Grid item xs={12} md={3} className={classes.maxHeight}>
          <Account action={ match.params.action } />
        </Grid>
        { loading && <Loader /> }
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader } = state;
  return {
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)))
