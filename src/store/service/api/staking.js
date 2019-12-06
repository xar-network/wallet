import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getStaking = async params => {
  try {

    var staking = await _getStaking()

    if(staking && staking.result) {
      console.log(staking)
      staking = staking.result
    }

    console.log(staking)

    return store.dispatch(actions.setStaking(staking))

  } catch (err) {
    throw err;
  }
};

async function _getStaking() {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const res = await client.getStakingPool()

    if(res && res.result) {
      return res.result
    }
  } catch (ex) {
    console.log(ex)
  }
}
