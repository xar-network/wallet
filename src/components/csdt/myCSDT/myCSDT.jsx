import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Paper, Slide } from '@material-ui/core'
import { colors } from '../../theme'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import RefreshIcon from '@material-ui/icons/Refresh';

import DepositCSDT from '../depositCSDT'
import GenerateCSDT from '../generateCSDT'
import PaybackCSDT from '../paybackCSDT'
import WithdrawCSDT from '../withdrawCSDT'
import CloseCSDT from '../closeCSDT'
import PasswordModal from '../../passwordModal'

import { depositCSDT, withdrawCSDT, generateCSDT, paybackCSDT, startLoader, stopLoader, getCSDTParameters, getPrices, getBalance, getCSDT } from '../../../store/service/api';

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
  },
  refreshButton: {
    cursor: 'pointer',
    height: '44px',
    fill: colors.border
  },
});

class MyCSDT extends Component {

  constructor(props) {
    super();

    this.state = {
      csdtParameters: props.csdtParameters,
      csdt: props.csdt,
      minimumCollateralizationRatio: 150,
      minCollateral: 50,
      warningCollateralizationRatio: 50,
      privateKeyModalOpen: false,
      actionParams: null
    };

    this.onChange = this.onChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.showPrivateKeyModal = this.showPrivateKeyModal.bind(this)
    this.submitPrivateKey = this.submitPrivateKey.bind(this)
    this.closePrivateKeyModal = this.closePrivateKeyModal.bind(this)
  }

  onChange(e) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  async onRefresh() {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    startLoader()
    getCSDTParameters()
    getPrices()
    getBalance({ address: user.address })
    await getCSDT({ address: user.address, denom: 'uftm' })
    stopLoader()
  }

  render() {
    const { classes, match, width, csdt, calculateRatios, loading } = this.props;
    const {
      minimumCollateralizationRatio,
      warningCollateralizationRatio,
      privateKeyModalOpen
    } = this.state

    const collateral = csdt && csdt.collateral_amount && csdt.collateral_amount.length > 0 ? csdt.collateral_amount[0].amount : 0
    const collateralDenom =  csdt && csdt.collateral_amount && csdt.collateral_amount.length > 0 ? csdt.collateral_amount[0].denom : 'Unknown'
    const generated = csdt && csdt.debt && csdt.debt.length > 0 ? csdt.debt[0].amount : 'N/A'
    const generatedDenom =  csdt && csdt.debt && csdt.debt.length > 0 ? csdt.debt[0].denom : 'Unknown'

    const ratios = calculateRatios(collateral, collateralDenom, generated, minimumCollateralizationRatio)

    let warningStyle = {}
    let errorStyle = {}

    if(ratios.collateralizationRatio < minimumCollateralizationRatio + warningCollateralizationRatio) {
      warningStyle = {
        color: 'orange'
      }
    }

    if(ratios.collateralizationRatio < minimumCollateralizationRatio) {
      errorStyle = {
        color: '#f44336'
      }
    }

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
            <RefreshIcon onClick={ this.onRefresh } className={ classes.refreshButton }/>
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
                    <Typography variant={ 'body1' }>Liquidation price (UFTM/UCSDT)</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' }>{ ratios.liquidationPrice } UCSDT</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Current price information (UFTM/UCSDT)</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>{ ratios.currentPrice } UCSDT</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Liquidation penalty</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>0.000%</Typography>
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
                    <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Collateralization ratio</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{ ratios.collateralizationRatio+'%'}</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' } style={{ ...warningStyle, ...errorStyle }}>Minimum ratio</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' } style={{ ...warningStyle, ...errorStyle }}>{ minimumCollateralizationRatio+'%' }</Typography>
                  </Grid>
                  <Grid item xs={7} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' }>Stability Fee</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' }>0.000%</Typography>
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
                    <Typography variant={ 'body1' } className={ classes.larger }>Collateral</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Deposited</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>{ collateral + ' ' + collateralDenom }</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/deposit')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      disabled={ loading }
                      >
                        Deposit
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Max available to withdraw</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>{ ratios.maxWithdraw + ' ' + collateralDenom }</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/withdraw')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      disabled={ loading }
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
                    <Typography variant={ 'body1' } className={ classes.larger }>Position</Typography>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePair }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Generated</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePrice } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>{ generated + ' ' + generatedDenom }</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/payback')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      disabled={ loading }
                      >
                        Pay Back
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={ classes.pricePairSmall }>
                    <Typography variant={ 'body1' } className={ classes.smaller }>Max available to generate</Typography>
                  </Grid>
                  <Grid item xs={3} className={ classes.pricePriceSmall } align={ 'right' }>
                    <Typography variant={ 'h3' } className={ classes.smaller }>{ ratios.maxGenerated + ' ' + generatedDenom }</Typography>
                  </Grid>
                  <Grid item xs={4} align={ 'right' }>
                    <Button
                      className={ classes.ok }
                      onClick={() => this.nextPath('/csdt/mycsdt/generate')}
                      variant="contained"
                      size='medium'
                      color='secondary'
                      disabled={ loading }
                      >
                        Generate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
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

  showPrivateKeyModal(params) {
    this.setState({ privateKeyModalOpen: true, actionParams: params })
  }

  async submitPrivateKey(signingKey) {
    this.setState({ privateKeyModalOpen: false })

    const user = sessionStorage.getItem('xar-csdt-user')
    const userOjb = JSON.parse(user)

    const { match } = this.props
    const { actionParams } = this.state


    startLoader()

    let response = null;

    switch (match.params.action) {
      case 'deposit':
        response = await depositCSDT({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          collateralDenom: 'uftm',
          collateralChange: actionParams.collateral
        })
        break;
      case 'withdraw':
        response = await withdrawCSDT({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          collateralDenom: 'uftm',
          collateralChange: actionParams.collateral
        })
        break;
      case 'generate':
        response = await generateCSDT({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          collateralDenom: 'uftm',
          debtChange: actionParams.generated
        })
        break;
      case 'payback':
        response = await paybackCSDT({
          privateKey: signingKey,
          fromAddress: userOjb.address,
          collateralDenom: 'uftm',
          debtChange: actionParams.generated
        })
        break;
      case 'close':
        //ignore
        break;
    }

    stopLoader()
    this.nextPath('/csdt/mycsdt')
  }

  closePrivateKeyModal() {
    this.setState({ privateKeyModalOpen: false })
  }

  renderPrivateKeyModal() {
    return <PasswordModal onSubmit={ this.submitPrivateKey } onClose={ this.closePrivateKeyModal } />
  }

  renderModal(action) {

    const { classes, calculateRatios } = this.props

    let content = null

    switch (action) {
      case 'deposit':
        content = <DepositCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} calculateRatios={ calculateRatios } />
        break;
      case 'generate':
        content = <GenerateCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} calculateRatios={ calculateRatios } />
        break;
      case 'payback':
        content = <PaybackCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} calculateRatios={ calculateRatios } />
        break;
      case 'withdraw':
        content = <WithdrawCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} calculateRatios={ calculateRatios } />
        break;
      case 'close':
        content = <CloseCSDT onClose={this.toggleModal} onSubmit={this.showPrivateKeyModal} calculateRatios={ calculateRatios } />
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

const mapStateToProps = state => {
  const { csdts, prices, loader } = state;
  return {
    csdt: csdts.csdt,
    csdtParameters: csdts.csdtParameters,
    loading: loader.loading,
    csdtPrices: prices.prices,
  };
};

export default withRouter(connect(mapStateToProps)(withWidth()(withStyles(styles)(MyCSDT))))
