import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountOptions from './accountOptions';
import AccountCreate from './accountCreate';
import AccountUnlock from './accountUnlock';
import AccountConvert from './accountConvert';
import AccountUnlocked from './accountUnlocked';
import store from '../../store/';
import * as actions from '../../store/actions';
import {
  getNodeInfo,
  getBalance
} from '../../store/service';

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

  render () {
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
  const { accounts, nodeInfo } = state;
  return {
    accounts: accounts,
    nodeInfo: nodeInfo.nodeInfo
  };
};

export default withRouter(connect(mapStateToProps)(Account))
