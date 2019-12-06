import {
  SET_SUPPLY
} from '../../constants'

const initialState = {
  supply: {}
};

const interest = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLY:
      return Object.assign({}, state, {
        supply: action
      });
    default:
      return state
  }
}

export default interest
