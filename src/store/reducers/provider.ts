import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { Network } from '@web3/eth/static/network'
export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initalized = 'initalized'
}
export interface IProviderStore {
  status: Status
  message: string
  network: Network
}

export const defaultState: IProviderStore = {
  status: Status.Uninitialized,
  message: '',
  network: Network.MAINNET
}
export const providerSliceName = 'provider'
const providerSlice = createSlice({
  name: providerSliceName,
  initialState: defaultState,
  reducers: {
    initProvider(state) {
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
    setNetwork(state, action: PayloadAction<Network>) {
      state.network = action.payload
      return state
    }
  }
})

export const actions = providerSlice.actions
export const reducer = providerSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
