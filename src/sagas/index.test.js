import { delay } from 'redux-saga'

import { call } from 'redux-saga/effects'

import { makeRestartable } from '.'

it('Restarts terminated sagas.', async () => {
  const saga = function*() {}
  const gen = makeRestartable(saga)()
  expect(gen.next().value).toEqual(call(saga))
  expect(gen.next().value).toEqual(call(delay, 3000))
})
