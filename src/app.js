import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import Initializer from './bootstrap/initializer'
import Home from './containers/home'
import './app.scss'

const App = ({ store, history }) => (
  <Initializer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div id="router-root">
          <Helmet>
            <title>Kleros Dapp</title>
          </Helmet>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  </Initializer>
)

App.propTypes = {
  // State
  store: PropTypes.shape({}).isRequired,

  // Router
  history: PropTypes.shape({}).isRequired
}

export default App
