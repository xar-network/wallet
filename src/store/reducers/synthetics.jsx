import {
  SET_SYNTHETICS
} from '../../constants'

const initialState = {
  synthetics: null
};

const synthetics = (state = initialState, action) => {
  switch (action.type) {
    case SET_SYNTHETICS:
      return Object.assign({}, state, {
        synthetics: action.synthetics
      });
    default:
      return state
  }
}

export default synthetics
