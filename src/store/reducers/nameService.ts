/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface IAddressRecord {
  pubKey: string
  name: string
  initialized: boolean
  index: number
}
export interface ITokenRecord {
  pubKey: string
  name: string
}

export interface INameService {
  accounts: Map<string, IAddressRecord>
  tokens: Map<string, ITokenRecord>
}

export const defaultState: INameService = {
  accounts: new Map(),
  tokens: new Map()
}
export const nameServiceSliceName = 'nameService'
const nameServiceSlice = createSlice({
  name: nameServiceSliceName,
  initialState: defaultState,
  reducers: {
    addAccounts(state, action: PayloadAction<Map<string, IAddressRecord>>) {
      state.accounts = action.payload
      return state
    },
    addTokens(state, action: PayloadAction<Map<string, ITokenRecord>>) {
      state.tokens = action.payload
      return state
    },
    addNewAccount(state, action: PayloadAction<IAddressRecord>) {
      if (state.accounts.has(action.payload.name)) {
        if (state.accounts.get(action.payload.name)!.index > action.payload.index) {
          state.accounts.set(action.payload.name, action.payload)
        }
      } else {
        state.accounts.set(action.payload.name, action.payload)
      }
      return state
    },
    addNewToken(state, action: PayloadAction<ITokenRecord>) {
      state.tokens.set(action.payload.pubKey, action.payload)
      return state
    }
  }
})

export const actions = nameServiceSlice.actions
export const reducer = nameServiceSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
