import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const {
  createAccount,
  createToken,
  mintToken,
  freezeAccount,
  thawAccount,
  registerAccount
} = keySelectors(store, [
  'createAccount',
  'createToken',
  'mintToken',
  'freezeAccount',
  'thawAccount',
  'registerAccount'
])

export const modalsSelectors = {
  createAccount,
  createToken,
  mintToken,
  freezeAccount,
  thawAccount,
  registerAccount
}

export default modalsSelectors
