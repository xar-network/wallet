import { combineReducers } from 'redux'
import csdts from './csdts'
import accounts from './accounts'
import prices from './prices'
import tokens from './tokens'
import loader from './loader'
import nodeInfo from './nodeInfo'
import interest from './interest'
import staking from './staking'
import supply from './supply'
import liquidations from './liquidations'
import synthetics from './synthetics'
import screen from './screen'
import governance from './governance'

export default combineReducers({
  csdts,
  accounts,
  prices,
  tokens,
  loader,
  nodeInfo,
  interest,
  supply,
  staking,
  liquidations,
  synthetics,
  screen,
  governance,
})
