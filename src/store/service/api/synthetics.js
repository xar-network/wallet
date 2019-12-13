import store from '../../../store/';
import * as actions from '../../actions';

export const getSynthetics = async () => {
  try {
    const synthetics = await _getMarkets()

    console.log(synthetics)

    return store.dispatch(actions.setSynthetics(synthetics));

  } catch (err) {
    throw err;
  }
};

async function _getMarkets() {
  return [
    {
      name: 'Bitcoin',
      denom: 'ubtc',
      amount: '7230.28'
    },
    {
      name: 'Ethereum',
      denom: 'ueth',
      amount: '144.60'
    },
    {
      name: 'Fantom',
      denom: 'uftm',
      amount: '0.011'
    },
  ]
}
