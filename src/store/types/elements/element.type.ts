import { types } from 'mobx-state-tree'
import { elementTypesArray } from '@/store/constants'
import style from './style.type'

export default types
  .model('element', {
    id: types.identifier,
    name: types.string,
    type: types.enumeration('type', elementTypesArray),
    style
  })
