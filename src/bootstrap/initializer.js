import React, { PureComponent } from 'react'

import { web3 } from './kleros'
import RequiresMetaMask from './requires-meta-mask'

class Initializer extends PureComponent {
  state = {
    isWeb3Loaded: false,
    isWeb3Unlocked: false
  }

  async componentWillMount() {
    let accounts = []

    if (web3.accounts !== undefined) {
      this.setState({ isWeb3Loaded: true })
      accounts = await web3.accounts()
    }

    if (accounts.length !== 0) this.setState({ isWeb3Unlocked: true })
  }

  render() {
    if (!this.state.isWeb3Loaded) return <RequiresMetaMask />
    if (!this.state.isWeb3Unlocked) return <div>Please Unlock MetaMask</div>
    return <div>{this.props.children}</div>
  }
}

export default Initializer
