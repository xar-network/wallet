import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';
import { crypto } from '@xar-network/javascript-sdk';

export const getBalance = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const balances = await client.getBalance(params.address)

    return store.dispatch(actions.setBalances(balances))

  } catch (err) {
    throw err;
  }
};

export const unlockAccount = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const acc = await client.recoverAccountFromKeystore(params.keystore, params.password)
    acc.keystore = params.keystore

    return store.dispatch(actions.unlockAccount(acc));
  } catch (err) {
    return { error : err }
  }
};

export const lockAccount = async params => {
  try {
    store.dispatch(actions.lockAccount());
  } catch (err) {
    throw err;
  }
};

export const createAccount = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const acc = await client.createAccountWithMneomnic()
    //add error checking

    const keystore = crypto.generateKeyStore(acc.privateKey, params.password)
    acc.keystore = keystore

    delete acc.privateKey

    return store.dispatch(actions.createAccount(acc));

  } catch (err) {
    throw err;
  }
};

export const createAccountWithMneomnic = async params => {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const privKey = crypto.getPrivateKeyFromMnemonic(params.mnemonic)
    const keystore = crypto.generateKeyStore(privKey, params.password)
    const address = crypto.getAddressFromPrivateKey(privKey)

    const acc = {
      keystore: JSON.stringify(keystore),
      address: address
    }

    return store.dispatch(actions.createAccount(acc));

  } catch (err) {
    throw err;
  }
};

export const send = async params => {
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

    const tx = await client.transfer(fromAddress, toAddress, amount, denom, '')

    await sleep(6000)
    await getBalance({ address: fromAddress });

    return tx

  } catch (err) {
    throw err;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
