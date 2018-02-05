import unit from 'ethjs-unit'

import { takeLatest, call, put, select } from 'redux-saga/effects'

import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import { eth } from '../bootstrap/dapp-api'
import { action, errorAction } from '../utils/action'
import { ETH_NO_ACCOUNTS } from '../constants/error'

/**
 * Fetches the current wallet's accounts.
 */
export function* fetchAccounts() {
  try {
    const accounts = yield call(eth.accounts)
    if (!accounts[0]) throw new Error(ETH_NO_ACCOUNTS)

    yield put(action(walletActions.accounts.RECEIVE, { accounts }))
  } catch (err) {
    yield put(errorAction(walletActions.accounts.FAIL_FETCH, err))
  }
}

/**
 * Fetches the current wallet's ethereum balance.
 */
export function* fetchBalance() {
  try {
    const account = yield select(walletSelectors.getAccount)
    const balance = yield call(eth.getBalance, account)

    yield put(
      action(walletActions.balance.RECEIVE, {
        balance: unit.fromWei(balance, 'ether')
      })
    )
  } catch (err) {
    yield put(errorAction(walletActions.balance.FAIL_FETCH, err))
  }
}

/**
 * The root of the wallet saga.
 * @export default walletSaga
 */
export default function* walletSaga() {
  // Accounts
  yield takeLatest(walletActions.accounts.FETCH, fetchAccounts)

  // Balance
  yield takeLatest(walletActions.balance.FETCH, fetchBalance)
}
