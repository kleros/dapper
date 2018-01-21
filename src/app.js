import React from 'react'
import PropTypes from 'prop-types'
import loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import { TypographyStyle, GoogleFont } from 'react-typography'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import Initializer from './bootstrap/initializer'
import typography from './bootstrap/typography'
import { renderNull } from './utils'
import './app.scss'

const Home = loadable({
  loader: () => import('./containers/home/'),
  loading: renderNull // T O D O: Use loading spinner
})

const App = ({ store, history }) => (
  <Initializer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div id="router-root">
          <Helmet>
            <title>Kleros Dapp</title>
          </Helmet>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
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
