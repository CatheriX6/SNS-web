import { INameService, nameServiceSliceName } from '@reducers/nameService'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[nameServiceSliceName] as INameService

export const { accounts, tokens } = keySelectors(store, ['accounts', 'tokens'])

export const nameServiceSelectors = { accounts, tokens }

export default nameServiceSelectors
