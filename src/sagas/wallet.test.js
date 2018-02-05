import { call, put, select } from 'redux-saga/effects'

import * as walletActions from '../actions/wallet'
import * as walletSelectors from '../reducers/wallet'
import { eth } from '../bootstrap/dapp-api'
import { errorAction } from '../utils/action'
import { ETH_NO_ACCOUNTS } from '../constants/error'
import { TEST_ACCOUNT } from '../constants/testing'

import { fetchAccounts, fetchBalance } from './wallet'

it('Handles cases when there are no accounts.', () => {
  const gen = fetchAccounts()
  expect(gen.next().value).toEqual(call(eth.accounts))
  expect(gen.next([]).value).toEqual(
    put(
      errorAction(walletActions.accounts.FAIL_FETCH, new Error(ETH_NO_ACCOUNTS))
    )
  )
})

it('Handles invalid balances.', () => {
  const gen = fetchBalance()
  expect(gen.next().value).toEqual(select(walletSelectors.getAccount))
  expect(gen.next(TEST_ACCOUNT).value).toEqual(
    call(eth.getBalance, TEST_ACCOUNT)
  )
  expect(gen.next(null).value).toEqual(
    put(
      errorAction(
        walletActions.balance.FAIL_FETCH,
        new TypeError("Cannot read property 'toString' of null")
      )
    )
  )
})
