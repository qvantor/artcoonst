import { types } from 'mobx-state-tree'
import { values } from 'mobx'
import { doPolygonsIntersect } from '@/common'

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
    },
    getOverlap (selection: { x: number, y: number, width: number, height: number }) {
      const tl = { x: selection.x, y: selection.y }
      const tr = { x: selection.x + selection.width, y: selection.y }
      const bl = { x: selection.x, y: selection.y + selection.height }
      const br = { x: selection.x + selection.width, y: selection.y + selection.height }

      return values(self.items)
        .filter(item => doPolygonsIntersect(item.getPolygon(), [tl, tr, br, bl]))
    }
  }))

export default elements
