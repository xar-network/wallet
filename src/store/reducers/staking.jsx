import {
  SET_STAKING
} from '../../constants'

const initialState = {
  staking: {}
};

const interest = (state = initialState, action) => {
  switch (action.type) {
    case SET_STAKING:
      return Object.assign({}, state, {
        staking: action
      });
    default:
      return state
  }
}

export default interest
