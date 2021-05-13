import { ISignerStore, signerSliceName } from '../reducers/signer'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[signerSliceName] as ISignerStore

export const { message, status, address, balance } = keySelectors(store, [
  'message',
  'status',
  'address',
  'balance'
])

export const signerSelectors = { message, status, address, balance }

export default signerSelectors
