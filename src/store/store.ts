import makeInspectable from 'mobx-devtools-mst' // only-dev
import { types } from 'mobx-state-tree'

import elements from './elements'
import selection from './selection'

const storeModel = types
  .model('rootStore', {
    elements,
    selection
  })

const store = storeModel.create({
  elements: {},
  selection: {}
})
makeInspectable(store)

export type storeType = typeof store

export default store
