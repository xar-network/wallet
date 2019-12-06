import {
  SET_CSDT_PARAMETERS,
  SET_CSDT,
  SET_PENDING_CSDT
} from '../../constants'

const initialState = {
  csdtParameters: null,
  csdt: null
};

const cdcs = (state = initialState, action) => {
  switch (action.type) {
    case SET_CSDT_PARAMETERS:
      return Object.assign({}, state, {
        csdtParameters: action.parameters
      });
    case SET_CSDT:
      return Object.assign({}, state, {
        csdt: action.csdt
      });
    case SET_PENDING_CSDT:
      return Object.assign({}, state, {
        pendingCsdt: action.csdt
      });
    default:
      return state
  }
}

export default cdcs
