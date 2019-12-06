import {
  SET_NODE_INFO,
} from '../../constants'

const initialState = {
  nodeInfo: null,
};

const cdcs = (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_INFO:
      return Object.assign({}, state, {
        nodeInfo: action.nodeInfo
      });
    default:
      return state
  }
}

export default cdcs
