import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { navigation, loader } = keySelectors(store, ['navigation', 'loader'])

export const navigationSelectors = { navigation, loader }

export default navigationSelectors
