import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getSupply = async params => {
  try {

    var supply = await _getSupply()

    if(supply && supply.result) {
      console.log(supply)
      supply = supply.result
    }

    console.log(supply)

    return store.dispatch(actions.setSupply(supply))

  } catch (err) {
    throw err;
  }
};

async function _getSupply() {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const res = await client.getSupply()

    if(res && res.result) {
      return res.result
    }
  } catch (ex) {
    console.log(ex)
  }
}
