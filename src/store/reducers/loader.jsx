import {
  START_LOADER,
  STOP_LOADER,
} from '../../constants'

const initialState = {
  loading: false
};

const cdcs = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADER:
      return Object.assign({}, state, {
        loading: true
      });
    case STOP_LOADER:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state
  }
}

export default cdcs
