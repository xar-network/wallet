import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getCSDTParameters = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const csdtParameters = await client.getCSDTParameters()

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
      await getCSDT({address: fromAddress, denom: collateralDenom})

      return res
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
};

export const depositCSDT = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      collateralDenom,
      collateralChange
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.CSDT.depositCollateral(fromAddress, collateralDenom, collateralChange)
    const res = await client.sendTx(msg, fromAddress)

    if(res && res.logs && res.logs.length > 0 && res.logs[0].success === true) {

      //sleep for some time
      await sleep(6000)
      await getCSDT({address: fromAddress, denom: collateralDenom})

      return res
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
}

export const withdrawCSDT = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      collateralDenom,
      collateralChange
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.CSDT.withdrawCollateral(fromAddress, collateralDenom, collateralChange)
    const res = await client.sendTx(msg, fromAddress)

    if(res && res.logs && res.logs.length > 0 && res.logs[0].success === true) {

      //sleep for some time
      await sleep(6000)
      await getCSDT({address: fromAddress, denom: collateralDenom})

      return res
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
}

export const generateCSDT = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      collateralDenom,
      debtChange
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.CSDT.withdrawDebt(fromAddress, collateralDenom, "ucsdt", debtChange)
    const res = await client.sendTx(msg, fromAddress)

    if(res && res.logs && res.logs.length > 0 && res.logs[0].success === true) {

      //sleep for some time
      await sleep(6000)
      await getCSDT({address: fromAddress, denom: collateralDenom})

      return res
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
}

export const paybackCSDT = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      collateralDenom,
      debtChange
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.CSDT.settleDebt(fromAddress, collateralDenom, "ucsdt", debtChange)
    const res = await client.sendTx(msg, fromAddress)

    if(res && res.logs && res.logs.length > 0 && res.logs[0].success === true) {

      //sleep for some time
      await sleep(6000)
      await getCSDT({address: fromAddress, denom: collateralDenom})

      return res
    } else {
      return res
    }
  } catch (err) {
    throw err;
  }
}

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
