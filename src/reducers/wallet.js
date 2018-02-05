import PropTypes from 'prop-types'

import createReducer, { createResource } from '../utils/redux'

// Shapes
const {
  shape: accountsShape,
  initialState: accountsInitialState
} = createResource(PropTypes.arrayOf(PropTypes.string))
const {
  shape: balanceShape,
  initialState: balanceInitialState
} = createResource(PropTypes.string)
export { accountsShape, balanceShape }

// Reducer
export default createReducer({
  accounts: accountsInitialState,
  balance: balanceInitialState
})

// Selectors
export const getAccount = state =>
  state.wallet.accounts.data && state.wallet.accounts.data[0]
