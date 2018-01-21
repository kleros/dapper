import PropTypes from 'prop-types'
import { createReducer } from '../utils'

// Actions
export const FETCH_DISPUTES = 'FETCH_DISPUTES'
const RECEIVE_DISPUTES = 'RECEIVE_DISPUTES'

// Reducer
export default createReducer(
  { disputes: [] },
  {
    [RECEIVE_DISPUTES]: (state, action) => ({
      ...state,
      disputes: action.payload.disputes
    })
  }
)

// Action Creators
export const fetchDisputes = () => ({ type: FETCH_DISPUTES })
export const receiveDisputes = disputes => ({
  type: RECEIVE_DISPUTES,
  payload: { disputes }
})

// Selectors

// Shapes
export const disputeShape = PropTypes.shape({
  address: PropTypes.string
})
