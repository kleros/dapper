import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchBalance } from '../../actions/balance'

class Balance extends PureComponent {
  componentDidMount() {
    const { balance } = this.props.actions
    balance.fetchBalance()
  }

  render() {
    const { balance = 0 } = this.props
    return (
      <div>{balance ? <b>You have {balance} ETH.</b> : <b>loading...</b>}</div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.balance
})

const mapDispatchToProps = dispatch => ({
  actions: {
    balance: bindActionCreators({ fetchBalance }, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Balance)
