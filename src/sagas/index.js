import { delay } from 'redux-saga'
import { spawn, call, all } from 'redux-saga/effects'

import balanceSaga from './balance'
import disputesSaga from './disputes'

/**
 * Makes a saga restart after an uncaught error.
 * @param {object} saga - A generator function.
 * @returns {object} - A new generator function with the added functionality.
 */
function makeRestartable(saga) {
  return function*() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        yield call(saga)
        throw new Error(
          `Unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime! ${saga}`
        )
      } catch (err) {
        console.info(
          'Saga error, the saga will be restarted after 3 seconds.',
          err
        )
        yield call(delay, 3000)
      }
    }
  }
}

const rootSagas = [balanceSaga, disputesSaga].map(makeRestartable)

/**
 * The root saga.
 * @export default rootSaga
 */
export default function* rootSaga() {
  yield all(rootSagas.map(saga => spawn(saga)))
}
