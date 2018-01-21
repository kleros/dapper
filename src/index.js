import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './bootstrap/configure-store'
import App from './app'
import registerServiceWorker from './bootstrap/register-service-worker'

const { store, history } = configureStore()
export default store

// Random number is used so hot reloading works with `react-loadable`
const render = Component => {
  ReactDOM.render(
    <Component
      key={process.env.NODE_ENV === 'development' ? Math.random() : undefined}
      store={store}
      history={history}
    />,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  })
}

registerServiceWorker()
