import {
  SET_TOKENS
} from '../../constants'

const initialState = {
  tokens: null
};

const tokens = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return Object.assign({}, state, {
        tokens: action.tokens
      });
    default:
      return state
  }
}

export default tokens
