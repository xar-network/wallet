import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getCSDTParameters = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const csdtParameters = await client.getCSDTParameters()

    console.log(csdtParameters)
    return store.dispatch(actions.setCSDTParameters(csdtParameters))

  } catch (err) {
    throw err;
  }
};


export const createCSDT = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      collateralDenom,
      collateralChange,
      debtChange
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.CSDT.createOrModifyCSDT(fromAddress, collateralDenom, collateralChange, debtChange)
    const res = await client.sendTx(msg, fromAddress)

    if(res && res.logs && res.logs.length > 0 && res.logs[0].success === true) {

      //sleep for some time
      await sleep(6000)

      return getCSDT({address: fromAddress, denom: collateralDenom})
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
};

export const getCSDT = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()
    const res = await client.getCSDT(params.address, params.denom)

    return store.dispatch(actions.setCsdt(res.result.result[0]));

  } catch (err) {
    throw err;
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
