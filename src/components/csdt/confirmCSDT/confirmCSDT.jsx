import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createCSDT } from '../../../store/service/api/csdts.js';

import PasswordModal from '../../passwordModal'

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

class ConfirmCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      termsAccepted: false,
      pendingCsdt: props.pendingCsdt
    };

    this.onChange = this.onChange.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
    this.onFinalize = this.onFinalize.bind(this)
    this.validateTermsAndConditions = this.validateTermsAndConditions.bind(this)
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
    const { classes, pendingCsdt } = this.props;
    const { termsAccepted, privateKeyModalOpen } = this.state

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
              <Typography variant="h2" className={ classes.heading }>Collateralize UFTM & Generate UCSDT</Typography>
            </Grid>
            <Grid item xs={6} className={ classes.infoContainer }>
              <Grid container justify="flex-start" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Collateral</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ pendingCsdt ? pendingCsdt.collateral : 'Unknown' } UFTM</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={ classes.infoContainerRight }>
              <Grid container justify="flex-end" alignItems="flex-start">
                <Grid item xs={7} className={ classes.pricePair }>
                  <Typography variant={ 'body1' }>Generate</Typography>
                </Grid>
                <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                  <Typography variant={ 'h3' }>{ pendingCsdt ? pendingCsdt.generated : 'Unknown' } UCSDT</Typography>
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
                  <li>Your UFTM is locked up</li>
                </Typography>
                <Typography variant={ 'body1' }>
                  <li>UCSDT is generated based on the collateralization ratio and collateralized amount</li>
                </Typography>
                <Typography variant={ 'body1' }>
                  <li>UCSDT is transferred to your account</li>
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
                label={<span>I accept the terms that this is unaudited software and I will proceed with caution.</span>}
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
                onClick={ this.onFinalize }
                variant="contained"
                size='medium'
                color='primary'
                >
                  Finalize and Generate
              </Button>
            </Grid>
          </Grid>
        </Grid>
        { privateKeyModalOpen ? this.renderPrivateKeyModal() : null }
      </Grid>
    )
  }

  onFinalize() {
    if(this.validateTermsAndConditions()) {
      this.showPrivateKeyModal()
    }
  }

  validateTermsAndConditions(val) {
    const {
      termsAccepted
    } = this.state

    if(!val) {
      val = termsAccepted
    }

    this.setState({ termsAcceptedError: false })

    if(termsAccepted !== true) {
      this.setState({ termsAcceptedError: 'You need to accept the terms and conditions' })
    }

    return true
  }

  showPrivateKeyModal() {
    this.setState({ privateKeyModalOpen: true })
  }

  submitPrivateKey(signingKey) {
    this.setState({ privateKeyModalOpen: false })

    const { pendingCsdt } = this.props

    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)

    createCSDT({
      privateKey: signingKey,
      fromAddress: userOjb.address,
      collateralDenom: 'uftm',
      collateralChange: pendingCsdt.collateral,
      debtChange: pendingCsdt.generated
    })

    // this.nextPath('/csdt/mycsdt')
  }

  closePrivateKeyModal() {
    this.setState({ privateKeyModalOpen: false })
  }

  renderPrivateKeyModal() {
    return <PasswordModal onSubmit={ this.submitPrivateKey } onClose={ this.closePrivateKeyModal } />
  }
}

ConfirmCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts, csdts } = state;
  return {
    accounts: accounts.account,
    pendingCsdt: csdts.pendingCsdt
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ConfirmCSDT)))
