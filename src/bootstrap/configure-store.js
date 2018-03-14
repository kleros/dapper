/* eslint-disable global-require */
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

let store
let sagaMiddleware
let rootSagaTask

/**
 * Sets up the redux store.
 * @param {object} [initialState={}] - The initial state for the redux store, defaults to an empty object.
 * @param {{ dispatchSpy: function }} [integrationTestParams=[]] - Parameters necessary to setup integration tests.
 * @returns {{ store: object, history: object }} - An object with the store and the history objects.
 */
export default function configureStore(
  initialState = {},
  { dispatchSpy } = {}
) {
  sagaMiddleware = createSagaMiddleware()
  const history = createHistory()
  const enhancers = []
  const middleware = []
  const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  // Development Tools
  if (process.env.NODE_ENV === 'development') {
    const reduxImmutableState = require('redux-immutable-state-invariant')
      .default
    const reduxUnhandledAction = require('redux-unhandled-action').default
    middleware.push(
      reduxImmutableState(),
      reduxUnhandledAction(action =>
        console.error(
          `${action} didn't lead to creation of a new state object`,
          action
        )
      )
    )
  }

  // Testing Tools
  if (dispatchSpy) {
    middleware.push(_store => next => action => {
      dispatchSpy(action)
      return next(action)
    })
  }

  middleware.push(sagaMiddleware, routerMiddleware(history))
  enhancers.unshift(applyMiddleware(...middleware))
  store = createStore(rootReducer, initialState, composeEnhancers(...enhancers))
  rootSagaTask = sagaMiddleware.run(rootSaga)
  return { store, history }
}

if (module.hot) {
  module.hot.accept('../reducers', () => {
    store.replaceReducer(rootReducer)
  })
  module.hot.accept('../sagas', () => {
    rootSagaTask.cancel()
    rootSagaTask.done.then(() => (rootSagaTask = sagaMiddleware.run(rootSaga)))
  })
}
