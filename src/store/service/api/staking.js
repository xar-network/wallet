import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getStaking = async params => {
  try {

    var staking = await _getStaking()

    if(staking && staking.result) {
      staking = staking.result
    }

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
  } catch (err) {
    throw err;
  }
}


export const delegateStake = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      toAddress,
      amount,
      denom
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.Staking.delegate(fromAddress, toAddress, denom, amount)
    const res = await client.sendTx(msg, fromAddress)
    return res

  } catch (err) {
    throw err;
  }
}

export const undelegateStake = async params => {
  try {
    const {
      privateKey,
      fromAddress,
      toAddress,
      amount,
      denom
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()
    await client.setPrivateKey(privateKey)

    const msg = client.Staking.undelegate(fromAddress, toAddress, denom, amount)
    const res = await client.sendTx(msg, fromAddress)
    return res

  } catch (err) {
    throw err;
  }
}

export const getAllDelegations = async params => {
  try {
    const {
      address
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()

    const delegations = await client.getAllDelegations(address)

    if(delegations && delegations.result && delegations.result.result) {
      return store.dispatch(actions.setDelegations(delegations.result.result))
    } else {
      return delegations
    }

  } catch (err) {
    throw err;
  }
}

export const getAllUnbondingDelegations = async params => {
  try {
    const {
      address
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()

    const delegations = await client.getAllUnbondingDelegations(address)

    if(delegations && delegations.result && delegations.result.result) {
      return store.dispatch(actions.setUnbondedDelegations(delegations.result.result))
    } else {
      return delegations
    }

  } catch (err) {
    throw err;
  }
}

export const getAllBondedValidators = async params => {
  try {
    const {
      address
    } = params

    const client = new XarClient(config.xarApi)
    await client.initChain()

    const validators = await client.getAllBondedValidators(address)

    if(validators && validators.result && validators.result.result) {
      return store.dispatch(actions.setBondedValidators(validators.result.result))
    } else {
      return validators
    }

  } catch (err) {
    throw err;
  }
}

export const getAllValidators = async () => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const validators = await client.getAllValidators()

    if(validators && validators.result && validators.result.result) {
      return store.dispatch(actions.setValidators(validators.result.result))
    } else {
      return validators
    }

  } catch (err) {
    throw err;
  }
}
