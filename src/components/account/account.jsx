import React from 'react'
import AccountOptions from './accountOptions'
import AccountCreate from './accountCreate'
import AccountUnlock from './accountUnlock'
import AccountUnlocked from './accountUnlocked'

const Account = (props) => {
  switch(props.action) {
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

export default Account
