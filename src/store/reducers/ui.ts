import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { Tabs } from '@components/Header/Header'

export interface Loader {
  open: boolean
  message?: string
}
export interface IUIStore {
  navigation: Tabs
  loader: Loader
}

export const defaultState: IUIStore = {
  navigation: Tabs.Wallet,
  loader: { open: false, message: '' }
}
export const uiSliceName = 'ui'
const uiSlice = createSlice({
  name: uiSliceName,
  initialState: defaultState,
  reducers: {
    setNavigation(state, action: PayloadAction<Tabs>) {
      state.navigation = action.payload
      return state
    },
    setLoader(state, action: PayloadAction<Loader>) {
      state.loader = action.payload
      return state
    }
  }
})

export const actions = uiSlice.actions
export const reducer = uiSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
