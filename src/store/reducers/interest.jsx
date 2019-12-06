import {
  SET_INTEREST
} from '../../constants'

const initialState = {
  interest: 0.07
};

const interest = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTEREST:
      return Object.assign({}, state, {
        interest: action
      });
    default:
      return state
  }
}

export default interest
