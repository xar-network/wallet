import store from '../../../store/';
import * as actions from '../../actions';

export const toggleAccount = async params => {
  try {
    return store.dispatch(actions.toggleAccount())
  } catch (err) {
    throw err;
  }
};

export const collapseAccount = async params => {
  try {
    return store.dispatch(actions.collapseAccount())
  } catch (err) {
    throw err;
  }
};

export const expandAccount = async params => {
  try {
    return store.dispatch(actions.expandAccount())
  } catch (err) {
    throw err;
  }
}
