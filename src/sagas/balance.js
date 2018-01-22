import { call, put, takeLatest, fork } from 'redux-saga/effects'

import { FETCH_BALANCE, receiveBalance } from '../actions/balance'
import { fetchBalance } from './utils/fetch-balance'

/**
 * Fetches ethereum balance
 */
export function* getBalance() {
  try {
    const balance = yield call(fetchBalance)
    yield put(receiveBalance(balance))
  } catch (e) {
    console.log(e)
  }
}

/**
 * The root of the balance saga.
 * @export default balanceSaga
 */
export default function* balanceSaga() {
  yield fork(takeLatest, FETCH_BALANCE, getBalance)
}
