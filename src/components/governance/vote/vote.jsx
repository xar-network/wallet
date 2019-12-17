import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    padding: '30px'
  },
  closeButton: {
    cursor: 'pointer'
  },
  title: {
    marginBottom: '32px'
  },
  button: {
    marginTop: '32px'
  },
  infoTitle: {
    marginTop: '12px'
  },
  infoValue: {
    marginTop: '6px'
  },
  sepperate: {
    marginTop: '32px'
  },
  textField: {
    width: '350px'
  }
});

class Vote extends Component {

  constructor(props) {
    super();
    this.state = { };

    this.onChange = this.onChange.bind(this)
    this.onSubmitFor = this.onSubmitFor.bind(this)
    this.onSubmitAgainst = this.onSubmitAgainst.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  handleKeyDown(event) {
    if (event.which === 13) {
      this.onSubmit();
    }
  };

  onSubmitFor() {
    this.props.onSubmit({ vote: true })
  };

  onSubmitAgainst() {
    this.props.onSubmit({ vote: false })
  };

  render() {
    const { classes, onClose, loading, proposal } = this.props;

    if(!proposal) {
      return null
    }

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={10} className={classes.header}>
          <Typography variant="h2" className={ classes.title }>Proposal #{proposal.id}</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <CloseIcon onClick={onClose} className={ classes.closeButton }/>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1">{proposal.content.value.title}</Typography>
        </Grid>
        <Grid item xs={12} align="center" className={ classes.sepperate }>
          <Button
            variant="outlined"
            size='large'
            onClick={this.onSubmitFor}
            disabled={loading}
            >
              Vote For
          </Button>
        </Grid>
        <Grid item xs={12} align="center" className={ classes.sepperate }>
          <Button
            variant="outlined"
            size='large'
            onClick={this.onSubmitAgainst}
            disabled={loading}
            >
              Vote Against
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Vote.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { governance, loader } = state;
  return {
    loading: loader.loading,
    proposal: governance.proposal
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Vote)))
