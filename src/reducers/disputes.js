import PropTypes from 'prop-types'

import { createReducer } from '../utils'
import { disputeActions } from '../actions'

// Reducer
export default createReducer(
  { disputes: [] },
  {
    [disputeActions.RECEIVE_DISPUTES]: (state, action) => ({
      ...state,
      disputes: action.payload.disputes
    })
  }
)

// Selectors

// Shapes
export const disputeShape = PropTypes.shape({
  address: PropTypes.string
})
