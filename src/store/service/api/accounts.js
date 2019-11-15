import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import ZarClient from '@zar-network/javascript-sdk';
import { crypto } from '@zar-network/javascript-sdk';

export const unlockAccount = async params => {
  try {
    console.log(params)

    const client = new ZarClient(config.zarApi)
    await client.initChain()

    const acc = await client.recoverAccountFromKeystore(params.keystore, params.password)
    acc.keystore = params.keystore

    return store.dispatch(actions.unlockAccount(acc));
  } catch (err) {
    throw err;
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
    const client = new ZarClient(config.zarApi)
    await client.initChain()

    const acc = await client.createAccountWithMneomnic()
    //add error checking

    const keystore = crypto.generateKeyStore(acc.privateKey, params.password)
    acc.keystore = keystore

    return store.dispatch(actions.createAccount(acc));

  } catch (err) {
    throw err;
  }
};
