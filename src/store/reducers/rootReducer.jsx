import { combineReducers } from 'redux'
import csdts from './csdts'
import accounts from './accounts'
import prices from './prices'
import tokens from './tokens'
import loader from './loader'
import nodeInfo from './nodeInfo'

export default combineReducers({
  csdts,
  accounts,
  prices,
  tokens,
  loader,
  nodeInfo
})
