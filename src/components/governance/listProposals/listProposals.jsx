import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core'
import { colors } from '../../theme'
import ProposalsTable from './proposalsTable.jsx'

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

class ListProposals extends Component {

  constructor(props) {
    super();

    this.state = {
      proposals: props.proposals,
    };
  };

  render() {
    const { classes, match, loading, navigate } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}>
        <Grid item xs={11} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>Governance Portal</Typography>
        </Grid>
        <Grid item xs={11} className={classes.body}>
          { this.renderProposalsTable() }
        </Grid>
      </Grid>
    )
  }

  renderProposalsTable() {
    const {
      proposals,
      navigate
    } = this.props

    if(!proposals || proposals.length === 0) {
      return <Typography variant="h2">No available proposals</Typography>
    }

    return <ProposalsTable data={proposals} navigate={navigate} />
  }
}

ListProposals.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, governance } = state;
  return {
    loading: loader.loading,
    proposals: governance.proposals
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ListProposals)))
