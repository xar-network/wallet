import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';


export const vote = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      proposalID,
      vote
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.Gov.vote(proposalID, vote === true ? "Yes" : "No", fromAddress)
    const res = await client.sendTx(msg, fromAddress)

    return res
  } catch (err) {
    throw err;
  }
};

export const setProposal = async params => {
  try {
    return store.dispatch(actions.setProposal(params))
  } catch (err) {
    throw err;
  }
};

export const getProposals = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()
    const res = await client.getAllProposals()

    return store.dispatch(actions.setProposals(res.result.result));

  } catch (err) {
    throw err;
  }
};

export const getProposal = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()
    const res = await client.getProposal(params.id)

    return store.dispatch(actions.setProposal(res.result.result));

  } catch (err) {
    throw err;
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
