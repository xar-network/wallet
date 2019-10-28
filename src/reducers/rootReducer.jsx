import { combineReducers } from 'redux'
import cdcs from './cdcs'
import accounts from './accounts'
import prices from './prices'

export default combineReducers({
  cdcs,
  accounts,
  prices
})
