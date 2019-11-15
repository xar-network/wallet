import {
  UNLOCK_ACCOUNT,
  LOCK_ACCOUNT,
  CREATE_ACCOUNT
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
    default:
      return state
  }
}

export default accounts
