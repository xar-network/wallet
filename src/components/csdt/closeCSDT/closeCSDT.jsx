import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core'
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

class CloseCSDT extends Component {

  constructor(props) {
    super();
    this.state = { };

    this.onChange = this.onChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      this.onSubmit();
    }
  };

  onSubmit() {
    this.props.onSubmit({ amount: this.state.amount, recipient: this.state.recipient })
  };

  onChange(e) {

    if(isNaN(e.target.value)) {
      return false
    }

    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  render() {
    const { classes, onClose } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={10} className={classes.header}>
          <Typography variant="h2" className={ classes.title }>Close CSDT</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <CloseIcon onClick={onClose} className={ classes.closeButton }/>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1">Closing your CSDT requires paying back your outstanding CSDT debt, as well as the accumulated stability fe.</Typography>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1" className={ classes.infoTitle }>Outstanding CSDT generated</Typography>
          <Typography variant="h3" className={ classes.infoValue }>0.53 CSDT</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Stability fee @5.0%/year in MKR </Typography>
          <Typography variant="h3" className={ classes.infoValue }>5.00%/year</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Current price information (FTM/USD)</Typography>
          <Typography variant="h3" className={ classes.infoValue }>183.01 USD</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Projected liquidation price (FTM/USD)</Typography>
          <Typography variant="h3" className={ classes.infoValue }>0.29 USD</Typography>
          <Typography variant="body1" className={ classes.infoTitle }>Projected collateralization ratio</Typography>
          <Typography variant="h3" className={ classes.infoValue }>92,054.03 %</Typography>
        </Grid>
        <Grid item xs={6} className={ classes.sepperate }>
          <Button
            className={ classes.button }
            variant="contained"
            size='medium'
            color='secondary'
            onClick={onClose}
            >
              Cancel
          </Button>
        </Grid>
        <Grid item xs={6} align="right" className={ classes.sepperate }>
          <Button
            className={ classes.button }
            variant="contained"
            size='medium'
            color='primary'
            onClick={ this.onSubmit }
            >
              Close
          </Button>
        </Grid>
      </Grid>
    )
  }
}

CloseCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(CloseCSDT)))
