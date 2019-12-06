import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountOptions from './accountOptions'
import AccountCreate from './accountCreate'
import AccountUnlock from './accountUnlock'
import AccountUnlocked from './accountUnlocked'
import store from '../../store/';
import * as actions from '../../store/actions';
import { getBalance, getCSDT } from '../../store/service';

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
    } else {
      if(props.match && props.match.path.includes('/csdt')) {
        this.nextPath('/', props)
      }
    }
  }

  nextPath(path, props) {
    props.history.push(path);
  }

  render () {
    const { action } = this.props

    switch(action) {
      case 'unlocked':
        return <AccountUnlocked />
      case 'unlock':
        return <AccountUnlock />
      case 'create':
        return <AccountCreate />
      case 'options':
        return <AccountOptions />
      default:
        return <AccountOptions />
    }
  }
}

const mapStateToProps = state => {
  const { accounts } = state;
  return {
    accounts: accounts
  };
};

export default withRouter(connect(mapStateToProps)(Account))
