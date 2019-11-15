import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    borderLeft: '1px solid '+colors.border,
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start'
  },
  header: {
    padding: '30px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  body: {
    padding: '30px'
  },
  openCSDT: {
    marginTop: '32px'
  },
  heading: {
    marginBottom: '42px'
  },
  infoContainer: {
    marginTop: '48px',
    padding: '36px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border
  },
  infoContainerRight: {
    marginTop: '48px',
    padding: '36px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border,
    borderLeft: '1px solid '+colors.border
  },
  pricePair: {
    paddingBottom: '8px'
  },
  pricePrice: {
    paddingBottom: '8px'
  },
  smaller: {
    fontSize: '14px'
  }
});

class OpenCSDT extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

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
          <Typography variant="h1" className={ classes.title }>CSDT Portal</Typography>
        </Grid>
        <Grid item xs={11} className={classes.body}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2" className={ classes.heading }>Collateralize & Generate FTM</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much FTM would you like to collateralize?</Typography>
              <TextField
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">FTM</InputAdornment>,
                }}
                helperText="Min. FTM required: 0.03 FTM"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">How much ZAR would you like to generate?</Typography>
              <TextField
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">FTM</InputAdornment>,
                }}
                helperText="Max ZAR available to generate: 1.32 FTM"
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Liquidation price (FTM/USD)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>1.4 USD</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Current price information (FTM/USD)</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>2.8 USD</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Liquidation penalty</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>13.000%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Collateralization ration</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>325.45%</Typography>
                </Grid>
                <Grid item xs={7} className={ classes.pricePairSmall }>
                  <Typography variant={ 'body1' } className={ classes.smaller }>Minimum ratio</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                  <Typography variant={ 'h3' } className={ classes.smaller }>150.000%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={ classes.openCSDT }
                onClick={() => this.nextPath('/csdt/confirm')}
                variant="contained"
                size='medium'
                color='primary'
                >
                  Collateralize and Generate
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

OpenCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(OpenCSDT)))
