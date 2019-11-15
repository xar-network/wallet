import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountOptions from './accountOptions'
import AccountCreate from './accountCreate'
import AccountUnlock from './accountUnlock'
import AccountUnlocked from './accountUnlocked'


class Account extends Component {
  constructor(props) {
    super(props);
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
