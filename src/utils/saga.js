import { call, put } from 'redux-saga/effects'

import { action as _action, errorAction } from './action'

/**
 * Calls a saga with the `lessdux` fetch flow.
 * @param {object} resourceActions - The `lessdux` resource actions object for the resource being fetched.
 * @param {object} saga - The saga that does the actual fetching and returns the result.
 * @param {object} action - The action that triggered the saga.
 */
export function* fetchSaga(resourceActions, saga, action) {
  try {
    const result = yield call(saga, action)

    yield put(
      _action(resourceActions.RECEIVE, {
        [result.collection ? 'collectionMod' : resourceActions.self]: result
      })
    )
  } catch (err) {
    yield put(errorAction(resourceActions.FAIL_FETCH, err))
  }
}
