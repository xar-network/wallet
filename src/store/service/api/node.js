import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getNodeInfo = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const nodeInfo = await client.getNodeInfo()
    return store.dispatch(actions.setNodeInfo(nodeInfo.result))
  } catch (err) {
    throw err;
  }
};
