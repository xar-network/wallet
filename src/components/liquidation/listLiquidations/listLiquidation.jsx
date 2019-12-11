import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core'
import { colors } from '../../theme'
import LiquidationTable from './liquidationTable.jsx'

const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start',
    marginBottom: '12px'
  },
  header: {
    padding: '30px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  body: {
    paddingTop: '28px'
  }
});

class ListLiquidation extends Component {

  constructor(props) {
    super();

    this.state = {
      liquidations: props.liquidations,
    };
  };

  render() {
    const { classes, match, loading } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={11} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>Liquidation Portal</Typography>
        </Grid>
        <Grid item xs={11} className={classes.body}>
          { this.renderLiquidationTable() }
        </Grid>
      </Grid>
    )
  }

  renderLiquidationTable() {
    const liquidations = this.props.liquidations

    if(!liquidations || liquidations.length === 0) {
      return <Typography variant="h2">No available liquidations</Typography>
    }

    return <LiquidationTable data={liquidations} />
  }
}

ListLiquidation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, liquidations } = state;
  return {
    loading: loader.loading,
    liquidations: liquidations.liquidations
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ListLiquidation)))
