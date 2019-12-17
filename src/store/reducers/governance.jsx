import {
  SET_PROPOSALS,
  SET_PROPOSAL,
} from '../../constants'

const initialState = {
  proposals: null,
  proposal: null,
};

const governance = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPOSALS:
      return Object.assign({}, state, {
        proposals: action.proposals
      });
    case SET_PROPOSAL:
      return Object.assign({}, state, {
        proposal: action.proposal
      });
    default:
      return state
  }
}

export default governance
