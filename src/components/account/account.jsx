import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Tooltip
} from '@material-ui/core'
import AccountOptions from './accountOptions';
import AccountCreate from './accountCreate';
import AccountUnlock from './accountUnlock';
import AccountConvert from './accountConvert';
import AccountUnlocked from './accountUnlocked';
import store from '../../store/';
import * as actions from '../../store/actions';
import { colors } from '../theme'
import {
  getNodeInfo,
  getBalance,
  toggleAccount
} from '../../store/service';
import { withStyles } from '@material-ui/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
  accountContainer: {
    display: 'inline-block',
    width: '500px',
    transition: '1s'
  },
  accountContainerCollapsed: {
    width: '0px',
    display: 'none',
    transition: '1s'
  },
  accountContainerSmall: {
    width: '100%',
    flexShrink: 0
  },
  toggleCollapse: {
    top: '25px',
    right: '485px',
    display: 'block',
    position: 'absolute',
    border: '1px solid '+colors.lightGray,
    borderRadius: '30px',
    width: '30px',
    height: '30px',
    background: colors.card,
    [theme.breakpoints.down('md')]: {
      right: '25px',
      top: '95px'
    },
  },
  toggleCollapsed: {
    top: '25px',
    right: '25px',
    display: 'block',
    position: 'absolute',
    border: '1px solid '+colors.lightGray,
    borderRadius: '30px',
    width: '30px',
    height: '30px',
    background: colors.card,
    [theme.breakpoints.down('md')]: {
      right: '25px',
      top: '95px'
    },
  },
  chevronIcon: {
    color: colors.lightGray,
    verticalAlign: 'middle',
    cursor: 'pointer',
    margin: '3px'
  },
});

class Account extends Component {

  constructor(props) {
    super();

    this.validateUser = this.validateUser.bind(this)
    this.setFlow = this.setFlow.bind(this)

    const userLoggedIn = this.validateUser(props)

    this.state = {
      currentFlow: userLoggedIn ? 'unlocked' : 'options'
    };
  }

  validateUser(props) {
    getNodeInfo()

    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    if(user.address && user.keystore) {
      store.dispatch(actions.unlockAccount(user));
      getBalance({ address: user.address })
      return true
    } else {
      return false
    }
  }

  setFlow(flow) {
    if(flow === 'unlocked' && this.state.currentFlow !== 'unlocked') {
      const userString = sessionStorage.getItem('xar-csdt-user')
      const user = JSON.parse(userString || '{}')

      getBalance({ address: user.address })
    }

    this.setState({ currentFlow: flow })
  }

  render() {
    const { classes, width, accountsCollapsed } = this.props

    return (
    <React.Fragment>
      <Grid item className={ isWidthUp('lg', width) ? (!accountsCollapsed ? classes.accountContainer : classes.accountContainerCollapsed) : (classes.accountContainerSmall) }>
        { this.renderScreen() }
      </Grid>
      <div className={ !accountsCollapsed ? classes.toggleCollapse : classes.toggleCollapsed } onClick={ toggleAccount }>
          { accountsCollapsed ?
          (isWidthUp('lg', width) ? <ChevronLeftIcon className={ classes.chevronIcon } /> : <KeyboardArrowDownIcon className={ classes.chevronIcon } />)
            :
          (isWidthUp('lg', width) ? <ChevronRightIcon className={ classes.chevronIcon } /> : <KeyboardArrowUpIcon className={ classes.chevronIcon } />)}
      </div>
    </React.Fragment>)
  }

  /*<Tooltip title="Toggle Accounts" placement="left">
  </Tooltip>*/

  renderScreen () {
    const { nodeInfo } = this.props
    const { currentFlow } = this.state

    switch(currentFlow) {
      case 'unlocked':
        return <AccountUnlocked setFlow={ this.setFlow } />
      case 'unlock':
        return <AccountUnlock setFlow={ this.setFlow } nodeInfo={ nodeInfo } />
      case 'convert':
        return <AccountConvert setFlow={ this.setFlow } nodeInfo={ nodeInfo } />
      case 'create':
        return <AccountCreate setFlow={ this.setFlow } nodeInfo={ nodeInfo } />
      case 'options':
        return <AccountOptions setFlow={ this.setFlow } nodeInfo={ nodeInfo } />
      default:
        return <AccountOptions setFlow={ this.setFlow } nodeInfo={ nodeInfo } />
    }
  }
}

const mapStateToProps = state => {
  const { accounts, nodeInfo, screen } = state;
  return {
    accounts: accounts,
    nodeInfo: nodeInfo.nodeInfo,
    accountsCollapsed: screen.accountsCollapsed
  };
};

export default withRouter(connect(mapStateToProps)(withWidth()(withStyles(styles)(Account))))
