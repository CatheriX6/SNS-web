import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { BigNumber } from 'ethers'
export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initalized = 'initalized'
}
export interface ISignerStore {
  status: Status
  message: string
  address: string
  balance: BigNumber
}

export const defaultState: ISignerStore = {
  status: Status.Uninitialized,
  message: '',
  address: '',
  balance: BigNumber.from(0)
}
export const signerSliceName = 'signer'
const signerSlice = createSlice({
  name: signerSliceName,
  initialState: defaultState,
  reducers: {
    initSigner(state) {
      state.status = Status.Init
      return state
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
      return state
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<BigNumber>) {
      state.balance = action.payload
      return state
    },
    reduceBalance(state, action: PayloadAction<BigNumber>) {
      state.balance = state.balance.sub(action.payload)
      return state
    },
    increaseBalance(state, action: PayloadAction<BigNumber>) {
      state.balance = state.balance.add(action.payload)
      return state
    }
  }
})

export const actions = signerSlice.actions
export const reducer = signerSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
