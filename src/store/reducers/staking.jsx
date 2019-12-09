import {
  SET_STAKING,
  SET_VALIDATORS,
  SET_BONDED_VALIDATORS,
  SET_DELEGATIONS,
  SET_UNBONDED_DELEGATIONS,
} from '../../constants'

const initialState = {
  staking: {},
  validators: [],
  bondedValidators: [],
  delegations: [],
  unbondedDelegations: []
};

const interest = (state = initialState, action) => {
  switch (action.type) {
    case SET_STAKING:
      return Object.assign({}, state, {
        staking: action
      });
    case SET_VALIDATORS:
      return Object.assign({}, state, {
        validators: action.validators
      });
    case SET_BONDED_VALIDATORS:
      return Object.assign({}, state, {
        bondedValidators: action.validators
      });
    case SET_DELEGATIONS:
      return Object.assign({}, state, {
        delegations: action.delegations
      });
    case SET_UNBONDED_DELEGATIONS:
      return Object.assign({}, state, {
        unbondedDelegations: action.delegations
      });
    default:
      return state
  }
}

export default interest
