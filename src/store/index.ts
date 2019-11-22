import store from './store'
import { useStore, useInject } from './inject'
import * as eC from './elementCreator'

export type storeType = typeof store
export { store, useInject, useStore, eC }
