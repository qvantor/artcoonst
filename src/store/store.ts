import makeInspectable from 'mobx-devtools-mst' // only-dev
import { types } from 'mobx-state-tree'

import elements, { elementsInital } from './elements'
import app, { appInital } from './app'
import selection from './selection'

const storeModel = types
  .model('rootStore', {
    app,
    elements,
    selection
  })

const store = storeModel.create({
  app: appInital,
  elements: elementsInital,
  selection: {}
})
makeInspectable(store)

export type storeType = typeof store

export default store
