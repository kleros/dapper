import PropTypes from 'prop-types'

import createReducer from '../utils/create-reducer'
import { createShape } from '../utils/react-redux'

// Reducer
export default createReducer({
  accounts: {
    loading: false,
    data: null,
    failedLoading: false
  },
  balance: {
    loading: false,
    data: null,
    failedLoading: false
  }
})

// Selectors
export const getAccount = state =>
  state.wallet.accounts.data && state.wallet.accounts.data[0]

// Shapes
export const accountsShape = createShape(PropTypes.arrayOf(PropTypes.string))
export const balanceShape = createShape(PropTypes.string)
