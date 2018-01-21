import * as disputesDux from '../duxs/disputes'
import { takeLatest } from 'redux-saga/effects'

/**
 * Fetches disputes for the current user and puts them in the store.
 */
function* fetchDisputes() {}

/**
 * The root of the disputes saga.
 * @export default disputesSaga
 */
export default function* disputesSaga() {
  yield takeLatest(disputesDux.FETCH_DISPUTES, fetchDisputes)
}
