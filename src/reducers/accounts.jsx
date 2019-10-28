import {
  UNLOCK_ACCOUNT,
  LOCK_ACCOUNT,
  CREATE_ACCOUNT
} from '../constants'

const accounts = (state = [], action) => {
  switch (action.type) {
    case UNLOCK_ACCOUNT:
      // TODO: implement
      return {};
    case LOCK_ACCOUNT:
      // TODO: implement
      return {};
    case CREATE_ACCOUNT:
      // TODO: implement
      return {};
    default:
      return state
  }
}

export default accounts
