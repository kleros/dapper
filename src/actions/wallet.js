// Actions
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS'
export const FAIL_FETCH_ACCOUNTS = 'FAIL_FETCH_ACCOUNTS'
export const FETCH_BALANCE = 'FETCH_BALANCE'
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE'
export const FAIL_FETCH_BALANCE = 'FAIL_FETCH_BALANCE'

// Action Creators
export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS })
export const fetchBalance = () => ({ type: FETCH_BALANCE })
