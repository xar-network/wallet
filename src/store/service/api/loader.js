import store from '../../../store/';
import * as actions from '../../actions';

export const startLoader = async params => {
  try {
    return store.dispatch(actions.startLoader())
  } catch (err) {
    throw err;
  }
};

export const stopLoader = async params => {
  try {
    return store.dispatch(actions.stopLoader())
  } catch (err) {
    throw err;
  }
}
