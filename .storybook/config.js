import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { host } from 'storybook-host'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import '../src/bootstrap/app.css'

// Storybook Host
addDecorator(
  host({
    title: 'Dapp Front Boilerplate UI-Kit',
    align: 'center middle'
  })
)

// Integration Wrapper
const store = createStore(
  combineReducers({}),
  applyMiddleware(store => next => action => {
    console.log(action)
    return next(action)
  })
)
addDecorator(story => (
  <Provider store={store}>
    <div>
      {console.log(store.getState())}
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </div>
  </Provider>
))

// Configure
configure(() => require('../stories/index.js'), module)
