import { types } from 'mobx-state-tree'
import { values } from 'mobx'

import { element, elementType } from '../types/elements'

const elements = types
  .model('elements', {
    items: types.map(element)
  })
  .actions(self => ({
    addElement (el: elementType) {
      self.items.put(el)
    }
  }))
  .views(self => ({
    getElementsArray (): ReadonlyArray<elementType> {
      return values(self.items)
    }
  }))

export default elements
