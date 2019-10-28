import {
  GET_CDCS,
  CREATE_CDC
} from '../constants'

const cdcs = (state = [], action) => {
  switch (action.type) {
    case GET_CDCS:
      // TODO: implement
      return {};
    case CREATE_CDC:
      // TODO: implement
      return {};
    default:
      return state
  }
}

export default cdcs
