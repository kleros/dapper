import Eth from 'ethjs'
import { Kleros } from 'kleros-api'
import * as ERRORS from '../constants/errors'

export const web3 =
  window.web3 && window.web3.currentProvider
    ? new Eth(window.web3.currentProvider)
    : new Eth(
        new Eth.providers.HttpProvider(
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_ETHEREUM_PROVIDER
            : process.env.DEV_ETHEREUM_PROVIDER
        )
      )
if (!web3.currentProvider) {
  throw new Error(ERRORS.WEB3_NOT_RESOLVED)
}

console.log(`Web3 initialized: ${web3}`)

export default new Kleros(web3.currentProvider, process.env.STORE_PROVIDER)
