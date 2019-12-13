import {
  TOGGLE_ACCOUNT,
  COLLAPSE_ACCOUNT,
  EXPAND_ACCOUNT
} from '../../constants'

const initialState = {
  accountsCollapsed: false
};

const screen = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACCOUNT:
      return Object.assign({}, state, {
        accountsCollapsed: !state.accountsCollapsed
      });
    case COLLAPSE_ACCOUNT:
      return Object.assign({}, state, {
        accountsCollapsed: true
      });
    case EXPAND_ACCOUNT:
      return Object.assign({}, state, {
        accountsCollapsed: false
      });
    default:
      return state
  }
}

export default screen
