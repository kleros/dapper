import unit from 'ethjs-unit'

import { takeLatest, call, put, select } from 'redux-saga/effects'

import * as walletActions from '../actions/wallet'
import * as walletSelectors from '../reducers/wallet'
import { eth } from '../bootstrap/dapp-api'
import { receiveAction, errorAction } from '../utils/actions'
import { ETH_NO_ACCOUNTS } from '../constants/errors'

/**
 * Fetches the current wallet's accounts.
 */
export function* fetchAccounts() {
  try {
    const accounts = yield call(eth.accounts)
    if (!accounts[0]) throw new Error(ETH_NO_ACCOUNTS)

    yield put(receiveAction(walletActions.RECEIVE_ACCOUNTS, { accounts }))
  } catch (err) {
    yield put(errorAction(walletActions.FAIL_FETCH_ACCOUNTS, err))
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
      receiveAction(walletActions.RECEIVE_BALANCE, {
        balance: unit.fromWei(balance, 'ether')
      })
    )
  } catch (err) {
    yield put(errorAction(walletActions.FAIL_FETCH_BALANCE, err))
  }
}

/**
 * The root of the wallet saga.
 * @export default walletSaga
 */
export default function* walletSaga() {
  yield takeLatest(walletActions.FETCH_ACCOUNTS, fetchAccounts)
  yield takeLatest(walletActions.FETCH_BALANCE, fetchBalance)
}
