// import { createReducer } from '../utils'
import { balanceActions } from '../actions'

// Reducer
export default (state = 0, { type, balance }) => {
  switch (type) {
    case balanceActions.RECEIVE_BALANCE:
      return balance
    default:
      return state
  }
}

// TODO fix it
// export default createReducer(
//   { balance: 0 },
//   {
//     [balanceActions.RECEIVE_BALANCE]: (state, action) => ({
//       ...state,
//       balance: action.payload.balance
//     })
//   }
// )

// TODO add selectors

// TODO add shapes
