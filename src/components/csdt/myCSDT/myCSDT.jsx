import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Paper, Slide } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import DepositCSDT from '../depositCSDT'
import GenerateCSDT from '../generateCSDT'
import PaybackCSDT from '../paybackCSDT'
import WithdrawCSDT from '../withdrawCSDT'
import CloseCSDT from '../closeCSDT'
import PasswordModal from '../../passwordModal'

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
  headerButton: {
    padding: '33px 0px',
    borderBottom: '1px solid '+colors.border,
    verticalAlign: 'bottom'
  },
  title: {
    color: colors.lightGray
  },
  body: {
  },
  openCSDT: {
    marginTop: '32px'
  },
  back: {
    marginTop: '32px',
    marginRight: '12px'
  },
  heading: {
    marginBottom: '42px'
  },
  infoContainer: {
    padding: '28px 0px',
    borderBottom: '1px solid '+colors.border
  },
  infoContainerRight: {
    padding: '28px 0px',
    borderBottom: '1px solid '+colors.border,
    borderLeft: '1px solid '+colors.border,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'none'
    }
  },
  pricePair: {
  },
  pricePrice: {
  },
  smaller: {
    fontSize: '14px'
  },
  larger: {
    fontSize: '18px'
  },
  circle:{
    borderRadius: '24px',
    height: '48px',
    width: '48px',
    border: '1px solid '+colors.border
  },
  actionPane: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    bottom: '0px',
    width: '480px',
    backgroundColor: colors.background
  }
});

class MyCSDT extends Component {

  constructor(props) {
    super();
    this.state = {
      collateral: 0,
      collateralError: false,
      generated: 0,
      generatedError: false,
      minCollateral: 0.5,
      maxGenerated: 0,
      collateralizationRatio: 0,
      minimumCollateralizationRatio: 150,
      conversionRatio: 2, //FTM / CSDT
      privateKeyModalOpen: false,
    };

    this.onChange = this.onChange.bind(this)
    this.validateCollateral = this.validateCollateral.bind(this)
    this.validateGenerated = this.validateGenerated.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
  }

  onChange(e) {

    const {
      conversionRatio,
      minimumCollateralizationRatio
    } = this.state

    if(e.target.id === 'collateral') {
      if(!this.validateCollateral(e.target.value))  {
        return false
      }

      const maxGenerated = (e.target.value * (1/conversionRatio) * 100 / minimumCollateralizationRatio).toFixed(2)
      if(this.state.generated > 0) {
        const collateralizationRatio = e.target.value * (1/conversionRatio) * 100 / this.state.generated
        this.setState({ maxGenerated: maxGenerated, collateralizationRatio: collateralizationRatio })
      } else {
        this.setState({ maxGenerated: maxGenerated, collateralizationRatio: 0 })
      }
    }

    if(e.target.id === 'generated') {
      if(!this.validateGenerated(e.target.value))  {
        return false
      }

      if(e.target.value > 0) {
        const collateralizationRatio = this.state.collateral * (1/conversionRatio) * 100 / e.target.value
        this.setState({ collateralizationRatio: collateralizationRatio })
      }
    }

    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  validateCollateral(val) {
    const {
      collateral,
      minCollateral
    } = this.state

    if(!val) {
      val = collateral
    }

    if(isNaN(val)) {
      return false
    }

    this.setState({ collateralError: false })

    if(val < minCollateral) {
      this.setState({ collateralError: 'Amount is less than minimum collateral' })
    }

    return true
  }

  validateGenerated(val) {
    const {
      collateral,
      generated,
      conversionRatio,
      minimumCollateralizationRatio
    } = this.state

    if(!val) {
      val = generated
    }

    if(isNaN(val)) {
      return false
    }
    this.setState({ generatedError: false })

    if(val > (collateral * (1/conversionRatio) * 100 / minimumCollateralizationRatio)) {
      this.setState({ generatedError: 'Amount exceeds maximum generated CSDT' })
    }

    return true
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes, match, width } = this.props;
    const {
      collateralizationRatio,
      minimumCollateralizationRatio,
      privateKeyModalOpen
    } = this.state

    return (
      <React.Fragment>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.container}>
          <Grid item xs={7} className={classes.header}>
            <Typography variant="h1" className={ classes.title }>CSDT Portal</Typography>
          </Grid>
          <Grid item xs={4} className={classes.headerButton} align='right'>
            <Button
              className={ classes.ok }
              onClick={() => this.nextPath('/csdt/mycsdt/close')}
              variant="contained"
              size='medium'
              color='secondary'
              >
                Close
            </Button>
          </Grid>
          <Grid item xs={11} className={classes.body}>
            <Grid container>
              <Grid
                item
                xs={12}
                lg={6}
                className={ classes.infoContainer }>
                <Grid container justify="flex-start" alignItems="flex-start" spacing={2}>
                  <Grid item xs={7} className={ classes.pricePair }>
                    <Typography variant={ 'body1' }>Liquidation price (FTM/USD)</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' }>1.4 USD</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Current price information (FTM/USD)</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>2.8 USD</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Liquidation penalty</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>13.000%</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                className={ classes.infoContainerRight }>
                <Grid container justify={ isWidthUp('lg', width) ? "flex-end" : 'flex-start'} alignItems="flex-start" spacing={2}>
                  <Grid item xs={7} className={ classes.pricePair }>
                    <Typography variant={ 'body1' }>Collateralization ratio</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' }>{ collateralizationRatio+'%'}</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Minimum ratio</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>{minimumCollateralizationRatio+'%'}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                className={ classes.infoContainer }>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                  <Grid item xs={11} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.larger }>FTM Collateral</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Deposited</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>1.4 FTM</Typography>
                    <Typography variant={ 'h3' } className={ classes.smaller }>2.8 USD</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/deposit')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      >
                        Deposit
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Max available to withdraw</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>2.8 FTM</Typography>
                    <Typography variant={ 'h3' } className={ classes.smaller }>5.6 USD</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/withdraw')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      >
                        Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                className={ classes.infoContainerRight }>
                <Grid container direction="row" justify={ isWidthUp('lg', width) ? "flex-end" : 'flex-start'} alignItems="center" spacing={1}>
                  <Grid item xs={11} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.larger }>CSDT Position</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Generated</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>1.4 CSDT</Typography>
                    <Typography variant={ 'h3' } className={ classes.smaller }>1.4 USD</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/payback')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      >
                        Pay Back
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Max available to generate</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>2.8 CSDT</Typography>
                    <Typography variant={ 'h3' } className={ classes.smaller }>2.8 USD</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/generate')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      >
                        Generate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} className={classes.header}>
            <Typography variant="h1" className={ classes.title }>CSDT History</Typography>
          </Grid>
          <Grid item xs={ isWidthUp('lg', width) ? 11 : 12} className={classes.header}>
            <Grid container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}>
              { this.renderHistoryItem() }
              { this.renderHistoryItem() }
            </Grid>
          </Grid>
        </Grid>
        { match.params.action ? this.renderModal(match.params.action) : null }
        { privateKeyModalOpen ? this.renderPrivateKeyModal() : null }
      </React.Fragment>
    )
  }

  renderHistoryItem() {

    const {
      classes
    } = this.props

    const item = {
      date: '2019-08-13',
      description: 'FTM Deposited'
    }

    return (
      <React.Fragment>
        <Grid item xs={1}>
          <div className={ classes.circle }></div>
        </Grid>
        <Grid item xs={11}>
          <Typography variant={ 'body1' } className={ classes.larger }>{item.description}</Typography>
          <Typography variant={ 'body1' } className={ classes.smaller }>{item.date}</Typography>
        </Grid>
      </React.Fragment>
    )
  }

  toggleModal() {
    this.nextPath('/csdt/mycsdt')
  }

  showPrivateKeyModal() {
    this.setState({ privateKeyModalOpen: true })
  }

  submitPrivateKey() {
    this.setState({ privateKeyModalOpen: false })
    this.toggleModal()
  }

  closePrivateKeyModal() {
    this.setState({ privateKeyModalOpen: false })
  }

  renderPrivateKeyModal() {
    return <PasswordModal onSubmit={ this.submitPrivateKey } onClose={ this.closePrivateKeyModal } />
  }

  renderModal(action) {

    const { classes } = this.props

    let content = null

    switch (action) {
      case 'deposit':
        content = <DepositCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'generate':
        content = <GenerateCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'payback':
        content = <PaybackCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'withdraw':
        content = <WithdrawCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      case 'close':
        content = <CloseCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} />
        break;
      default:

    }

    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper square={ true } elevation={ 3 } className={ classes.actionPane }>
          {content}
        </Paper>
      </Slide>
    )
  }
}

MyCSDT.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withWidth()(withStyles(styles)(MyCSDT))))
