import { getSigner } from '@web3/eth/access'
import { BigNumber } from 'ethers'

export const getAddress = async (): Promise<string> => await (await getSigner()).getAddress()
export const getBalance = async (): Promise<BigNumber> => await (await getSigner()).getBalance()
