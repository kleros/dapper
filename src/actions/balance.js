// Actions
export const FETCH_BALANCE = 'FETCH_BALANCE'
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE'

// Action Creators
export const fetchBalance = () => ({ type: FETCH_BALANCE })
export const receiveBalance = balance => ({ type: RECEIVE_BALANCE, balance })
