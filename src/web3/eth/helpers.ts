/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ContractTransaction, ContractReceipt } from 'ethers'
import { getProvider } from './access'

export const waitForConfirmation = async (
  transaction: ContractTransaction
): Promise<ContractReceipt> => await transaction.wait(1)

interface IGasInfo {
  average: number
  fastest: number
  fast: number
}
export let gasPrices: IGasInfo = {
  average: 20 * 1e9,
  fast: 50 * 1e9,
  fastest: 80 * 1e9
}
export const getGasInfo = async () => {
  try {
    const results = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
    const networkInfo = await results.json()
    gasPrices = {
      average: (networkInfo.average / 10) * 1e9,
      fast: (networkInfo.fast / 10) * 1e9,
      fastest: (networkInfo.fastest / 10) * 1e9
    }
  } catch (e) {
    console.log('Error while getting gas info', e)
  }
}
export const getCurrentBlock = async (): Promise<number> => {
  return await (await getProvider()).getBlockNumber()
}

export const formatCash = (n: number) => {
  if (n < 1e3) return n
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}
