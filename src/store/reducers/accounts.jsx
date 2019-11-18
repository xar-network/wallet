import {
  UNLOCK_ACCOUNT,
  LOCK_ACCOUNT,
  CREATE_ACCOUNT,
  SET_BALANCES
} from '../../constants'

const initialState = {
  account: null,
  createdAccount: null
};

const accounts = (state = initialState, action) => {
  switch (action.type) {
    case UNLOCK_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account
      });
    case LOCK_ACCOUNT:
      return Object.assign({}, state, {
        account: {}
      });
    case CREATE_ACCOUNT:
      return Object.assign({}, state, {
        createdAccount: action.account
      });
    case SET_BALANCES:
      return Object.assign({}, state, {
        balances: action.balances
      });
    default:
      return state
  }
}

export default accounts
