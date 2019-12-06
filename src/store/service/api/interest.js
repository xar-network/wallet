import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getInterest = async params => {
  try {

    var interest = await _getInterest()

    if(interest && interest.result) {
      console.log(interest)
      interest = interest.result
    }

    console.log(interest)

    return store.dispatch(actions.setInterest(interest))

  } catch (err) {
    throw err;
  }
};

async function _getInterest() {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const res = await client.getInflation()

    if(res && res.result) {
      return res.result
    }
  } catch (ex) {
    console.log(ex)
  }
}
