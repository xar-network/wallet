import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountOptions from './accountOptions'
import AccountCreate from './accountCreate'
import AccountUnlock from './accountUnlock'
import AccountUnlocked from './accountUnlocked'
import store from '../../store/';
import * as actions from '../../store/actions';
import {
  getBalance,
  getCSDT,
  getNodeInfo,
  getAllDelegations,
  getAllBondedValidators,
  getAllUnbondingDelegations
} from '../../store/service';

class Account extends Component {

  constructor(props) {
    super();
    this.state = { };

    this.validateUser = this.validateUser.bind(this)

    this.validateUser(props)
  }

  validateUser(props) {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    if(user.address && user.keystore) {
      store.dispatch(actions.unlockAccount(user));
      getBalance({ address: user.address })
      getCSDT({ address: user.address, denom: 'uftm' })
      getAllDelegations({ address: user.address })
      getAllUnbondingDelegations({ address: user.address })
      getAllBondedValidators({ address: user.address })
    } else {
      if(props.match && props.match.path.includes('/csdt')) {
        this.nextPath('/', props)
      }
    }
    getNodeInfo()
  }

  nextPath(path, props) {
    props.history.push(path);
  }

  render () {
    const { action, nodeInfo } = this.props

    switch(action) {
      case 'unlocked':
        return <AccountUnlocked />
      case 'unlock':
        return <AccountUnlock nodeInfo={ nodeInfo } />
      case 'create':
        return <AccountCreate nodeInfo={ nodeInfo } />
      case 'options':
        return <AccountOptions nodeInfo={ nodeInfo } />
      default:
        return <AccountOptions nodeInfo={ nodeInfo } />
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
