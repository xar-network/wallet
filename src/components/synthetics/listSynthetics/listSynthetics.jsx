import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core'
import { colors } from '../../theme'
import SyntheticsTable from './syntheticsTable.jsx'

const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start'
  },
  header: {
    padding: '15px 15px 16px 15px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  body: {
    paddingTop: '28px'
  }
});

class ListSynthetics extends Component {

  constructor(props) {
    super();

    this.state = {
      synthetics: props.synthetics,
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={11} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>Synthetics Market</Typography>
        </Grid>
        <Grid item xs={11} className={classes.body}>
          { this.renderLiquidationTable() }
        </Grid>
      </Grid>
    )
  }

  renderLiquidationTable() {
    const synthetics = this.props.synthetics

    if(!synthetics || synthetics.length === 0) {
      return <Typography variant="h2">No available synthetics</Typography>
    }

    return <SyntheticsTable data={synthetics} />
  }
}

ListSynthetics.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, synthetics } = state;
  return {
    loading: loader.loading,
    synthetics: synthetics.synthetics
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ListSynthetics)))
