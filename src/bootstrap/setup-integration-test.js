import React from 'react'
import { mount } from 'enzyme'

import configureStore from './configure-store'
import App from './app'

/**
 * Wait for all promises to resolve in a test environment.
 * @export
 * @returns {Promise} A promise that resolves when setImmediate is called.
 */
export function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

/**
 * Sets up an integration test environment.
 * @export
 * @param {any} initialState = {} The initial state.
 * @param {any} testElement Optional component to inject.
 * @returns {object} { store, dispatchSpy } The store and the dispatch spy.
 */
export default function setupIntegrationTest(initialState = {}) {
  const dispatchSpy = jest.fn(() => ({}))
  const { store, history } = configureStore(initialState, {
    dispatchSpy
  })
  const mountApp = testElement =>
    mount(<App store={store} history={history} testElement={testElement} />)

  return { store, history, dispatchSpy, mountApp }
}
