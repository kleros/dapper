import { mount } from 'enzyme'
import React from 'react'

import configureStore from './configure-store'
import App from './app'

/**
 * Wait for all promises to resolve in a test environment.
 * @returns {Promise<number>} - A promise that resolves when setImmediate is called.
 */
export function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

/**
 * Sets up an integration test environment.
 * @param {object} [initialState={}] - The initial state.
 * @returns {{ store: object, history: object, dispatchSpy: function, mountApp: function }} - Utilities for testing and the create-redux-form functions to test.
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
