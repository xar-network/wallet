import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment, FormControlLabel, Checkbox, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { colors } from '../../theme'
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
  }
});

class GenerateCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      collateral: 0,
      collateralError: false,
      minCollateral: 0.5,
    };

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  render() {
    const { classes, onClose } = this.props;
    const {
      collateral,
      collateralError,
      minCollateral
    } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={ classes.container }>
        <Grid item xs={10} className={classes.header}>
          <Typography variant="h2" className={ classes.title }>Generate CSDT</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <CloseIcon onClick={onClose} className={ classes.closeButton }/>
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1">How much CSDT would you like to generate?</Typography>
          <TextField
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            onChange={ this.onChange }
            value={ collateral }
            id="collateral"
            error={ collateralError }
            InputProps={{
              endAdornment: <InputAdornment position="end">CSDT</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} className={ classes.sepperate }>
          <Typography variant="body1" className={ classes.infoTitle }>Max. available to generate</Typography>
          <Typography variant="h3" className={ classes.infoValue }>0.53 CSDT</Typography>
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
            onClick={onClose}
            >
              Generate
          </Button>
        </Grid>
      </Grid>
    )
  }
}

GenerateCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(GenerateCSDT)))
