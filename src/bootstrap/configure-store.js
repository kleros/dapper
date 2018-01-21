/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

let sagaMiddleware
let store
let rootSagaTask

/**
 * Sets up the redux store.
 * @export default configureStore
 * @param {object} [initialState={}] The initial state for the redux store, defaults to an empty object.
 * @returns {object} An object with the store and the history objects.
 */
export default function configureStore(initialState = {}) {
  const history = createHistory()
  sagaMiddleware = createSagaMiddleware()
  const enhancers = []
  const middleware = []
  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  if (process.env.NODE_ENV === 'development') {
    const reduxImmutableState = require('redux-immutable-state-invariant')
      .default
    const reduxUnhandledAction = require('redux-unhandled-action').default
    middleware.push(reduxImmutableState())
    middleware.push(
      reduxUnhandledAction(action =>
        console.error(
          `${action} didn't lead to creation of a new state object`,
          action
        )
      )
    )
  }

  middleware.push(routerMiddleware(history), sagaMiddleware)
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
    rootSagaTask.done.then(() => sagaMiddleware.run(rootSaga))
  })
}
