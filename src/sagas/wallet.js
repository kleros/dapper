import Eth from 'ethjs'

import { takeLatest, select, call } from 'redux-saga/effects'

import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import { eth } from '../bootstrap/dapp-api'
import { fetchSaga } from '../utils/saga'
import * as errorConstants from '../constants/error'

/**
 * Fetches the current wallet's accounts.
 * @returns {object[]} - The accounts.
 */
export function* fetchAccounts() {
  const accounts = yield call(eth.accounts)
  if (!accounts[0]) throw new Error(errorConstants.ETH_NO_ACCOUNTS)

  return accounts
}

/**
 * Fetches the current wallet's ethereum balance.
 * @returns {number} - The balance.
 */
export function* fetchBalance() {
  const balance = yield call(
    eth.getBalance,
    yield select(walletSelectors.getAccount)
  )

  return Eth.fromWei(balance, 'ether')
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  // Accounts
  yield takeLatest(
    walletActions.accounts.FETCH,
    fetchSaga,
    walletActions.accounts,
    fetchAccounts
  )

  // Balance
  yield takeLatest(
    walletActions.balance.FETCH,
    fetchSaga,
    walletActions.balance,
    fetchBalance
  )
}
