import {
  GET_PRICES
} from '../../constants'

const prices = (state = [], action) => {
  switch (action.type) {
    case GET_PRICES:
      // TODO: implement
      return {}
    default:
      return state
  }
}

export default prices
