import store from '../../../store/';
import * as actions from '../../actions';
import config from '../../config';
import XarClient from '@xar-network/javascript-sdk';
import axios from 'axios'

export const getLiquidations = async () => {
  try {
    const allCSDTS = await _getAllCSDT()
    const priceRes = await _getPrice('uftm')
    let price = 0

    if(priceRes && priceRes.result) {
      price = priceRes.result.price
    }

    const liquidCSDTS = allCSDTS.map((csdt) => { return _addLiquidatioCalcValues(csdt, price) }).filter(_checkLiquidation)

    return store.dispatch(actions.setLiquidations(liquidCSDTS));

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

    return res
  } catch (ex) {
    console.log(ex)
  }
}

async function _getAllCSDT() {
  return await axios.get(config.xarApi+'/csdts?collateralDenom=uftm')
    .then(function (response) {
      return response.data.result
    })
    .catch(function (error) {
      console.log(error);
    })
}

function _addLiquidatioCalcValues(csdt, price) {
  csdt.calc_collateral = parseInt(csdt.collateral_amount[0].amount)
  csdt.calc_collateral_value = csdt.calc_collateral*price
  csdt.calc_collateral_value_adjusted = csdt.calc_collateral_value*0.666667
  csdt.calc_debt = parseInt(csdt.debt[0].amount)
  csdt.calc_collateral_ratio = csdt.calc_collateral_value/csdt.calc_debt*100
  csdt.calc_available = csdt.calc_collateral*(100-csdt.calc_collateral_ratio)/100

  return csdt
}

function _checkLiquidation(csdt) {
  return csdt.calc_collateral_value_adjusted < csdt.calc_debt
}
