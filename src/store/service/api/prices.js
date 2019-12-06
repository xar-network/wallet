import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';

export const getPrices = async params => {
  try {
    // const denoms = ['uftm', 'ubtc']
    const prices = []

    const price = await _getPrice('uftm')

    if(price && price.result) {
      prices.push(price.result)
    }

    return store.dispatch(actions.setPrices(prices))

  } catch (err) {
    throw err;
  }
};

async function _getPrice(denom) {
  try {
    const client = new XarClient(config.xarApi)
    await client.initChain()

    const res = await client.getCurrentPrice(denom)

    if(res && res.result) {
      return res.result
    }
  } catch (ex) {
    console.log(ex)
  }
}

export const getAccountInfo = async params => {
  try {

  } catch (err) {
    throw err;
  }
};

export const getTxHistoryByAddress = async params => {
  try {
  } catch (err) {
    throw err;
  }
};
