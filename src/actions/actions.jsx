import {
  UNLOCK_ACCOUNT,
  LOCK_ACCOUNT,
  CREATE_ACCOUNT,
  GET_CDCS,
  CREATE_CDC,
  GET_PRICES
} from '../constants'


/* ACCOUNTS */
export const unlockAccount = account => ({
  type: UNLOCK_ACCOUNT,
  account
})

export const lockAccount = account => ({
  type: LOCK_ACCOUNT,
  account
})

export const createAccount = account => ({
  type: CREATE_ACCOUNT,
  account
})


/* CDCS */
export const getCDCs = account => ({
  type: GET_CDCS,
  account
})

export const createCDC = (account, cdc) => ({
  type: CREATE_CDC,
  account,
  cdc
})


/* PRICES */
export const getPrices = () => ({
  type: GET_PRICES,
})
