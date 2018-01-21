// Actions
export const FETCH_DISPUTES = 'FETCH_DISPUTES'
const RECEIVE_DISPUTES = 'RECEIVE_DISPUTES'

// Action Creators
export const fetchDisputes = () => ({ type: FETCH_DISPUTES })
export const receiveDisputes = disputes => ({
  type: RECEIVE_DISPUTES,
  payload: { disputes }
})
