import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
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
  back: {
    marginTop: '32px',
    marginRight: '12px'
  },
  heading: {
    marginBottom: '12px'
  },
  infoContainer: {
    marginBottom: '48px',
    padding: '28px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border
  },
  infoContainerRight: {
    marginBottom: '48px',
    padding: '28px 0px',
    borderTop: '1px solid '+colors.border,
    borderBottom: '1px solid '+colors.border,
    borderLeft: '1px solid '+colors.border
  },
  pricePair: {
  },
  pricePrice: {
  },
  smaller: {
    fontSize: '14px'
  }
});

class OpenCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      termsAccepted: false
    };

    this.onChange = this.onChange.bind(this)
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.checked
    this.setState(st)
  };

  termsClicked() {
    window.open(window.location.origin + "/terms", '_blank', 'toolbar=0,location=0,menubar=0');
  };

  render() {
    const { classes } = this.props;
    const { termsAccepted } = this.state

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
            <Grid item xs={6} className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Collateral</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>0.5 FTM</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Generate</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>0.2 CSDT</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2" className={ classes.heading }>Transaction Information</Typography>
            </Grid>
            <Grid item xs={12} className={ classes.infoContainer }>
              <Typography variant={ 'body1' }>The following occurs when a CSDT is collateralized</Typography>
              <ol>
                <Typography variant={ 'body1' }>
                  <li>Your FTM is converted into cFTM</li>
                </Typography>
                <Typography variant={ 'body1' }>
                  <li>The generated cFTM is locked up</li>
                </Typography>
                <Typography variant={ 'body1' }>
                  <li>CSDT is generated based on the collateralization ration and collateralized amount</li>
                </Typography>
                <Typography variant={ 'body1' }>
                  <li>CSDT is transferred to your account</li>
                </Typography>
              </ol>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2" className={ classes.heading }>Terms and Conditions</Typography>
            </Grid>
            <Grid item xs={12} className={ classes.infoContainer }>
              <FormControlLabel
                control={
                  <Checkbox
                    id="termsAccepted"
                    checked={ termsAccepted }
                    onChange={ this.onChange }
                    value="termsAccepted"
                    color="primary"
                  />
                }
                label={<span>I accept the <a onClick={ this.termsClicked }>Terms and Conditions</a></span>}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={ classes.back }
                onClick={() => this.nextPath('/csdt/open')}
                variant="contained"
                size='medium'
                color='secondary'
                >
                  Back
              </Button>
              <Button
                className={ classes.openCSDT }
                onClick={() => this.nextPath('/csdt/mycsdt')}
                variant="contained"
                size='medium'
                color='primary'
                >
                  Finalize and Generate
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
