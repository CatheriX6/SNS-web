import { IProviderStore, providerSliceName } from '../reducers/provider'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[providerSliceName] as IProviderStore

export const { message, status, network } = keySelectors(store, ['message', 'status', 'network'])

export const providerSelectors = { message, status, network }

export default providerSelectors
