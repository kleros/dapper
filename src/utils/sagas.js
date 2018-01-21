import { call, race } from 'redux-saga/effects'

/**
 * @export
 * @param {object} saga - The saga to make `cancellable`.
 * @param {object} action - The action that triggered the saga.
 */
// eslint-disable-next-line import/prefer-default-export, require-jsdoc
export function* makeCancellable(saga, action) {
  yield race({
    task: call(saga, action),
    cancel: 'CANCEL_' + action.type
  })
}
