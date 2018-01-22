import unit from 'ethjs-unit'

import getWeb3 from '../../utils/get-web3'

export const fetchBalance = async () => {
  try {
    const web3Instance = await getWeb3()

    const accounts = await web3Instance.accounts()

    const balance = await web3Instance.getBalance(accounts[0])

    return unit.fromWei(balance, 'ether')
  } catch (e) {
    console.log(e)
  }
}
