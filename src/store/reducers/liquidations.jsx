import {
  SET_LIQUIDATIONS
} from '../../constants'

const initialState = {
  liquidations: null
};

const liquidations = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIQUIDATIONS:
      return Object.assign({}, state, {
        liquidations: action.liquidations
      });
    default:
      return state
  }
}

export default liquidations
