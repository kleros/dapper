import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as walletActions from '../actions/wallet'
import * as walletSelectors from '../reducers/wallet'
import { renderIf } from '../utils/react-redux'
import RequiresMetaMask from '../components/requires-meta-mask'

import { eth } from './dapp-api'

class Initializer extends PureComponent {
  static propTypes = {
    accounts: walletSelectors.accountsShape.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  }

  state = { isWeb3Loaded: eth.accounts !== undefined }

  componentDidMount() {
    const { fetchAccounts } = this.props
    fetchAccounts()
  }

  render() {
    const { isWeb3Loaded } = this.state
    const { accounts, children } = this.props

    return renderIf(
      [accounts.loading],
      [accounts.data && accounts.data[0]],
      [!isWeb3Loaded, accounts.failedLoading],
      {
        loading: 'Loading accounts...',
        done: children,
        failed: <RequiresMetaMask needsUnlock={isWeb3Loaded} />
      }
    )
  }
}

export default connect(
  state => ({
    accounts: state.wallet.accounts
  }),
  { fetchAccounts: walletActions.fetchAccounts }
)(Initializer)
