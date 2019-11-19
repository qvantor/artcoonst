import { types } from 'mobx-state-tree'
import { doPolygonsIntersect } from '@/common'

import { element, elementType } from '../types/elements'
import elementsInital from './elements.initial'

const typeParams = types.model('typeParams', {
  type: types.identifier,
  editable: types.boolean
})

export { elementsInital }

const elements = types
  .model('elements', {
    params: types.map(typeParams),
    items: types.array(element)
  })
  .actions(self => ({
    addElement (el: elementType) {
      self.items.push(el)
    }
  }))
  .views(self => ({
    getElementById (id: string) {
      return self.items.find(item => item.id === id)
    },
    getElements (): ReadonlyArray<elementType> {
      return self.items.length > 0 ? self.items : []
    },
    getOverlap (selection: { x: number, y: number, width: number, height: number }) {
      const tl = { x: selection.x, y: selection.y }
      const tr = { x: selection.x + selection.width, y: selection.y }
      const bl = { x: selection.x, y: selection.y + selection.height }
      const br = { x: selection.x + selection.width, y: selection.y + selection.height }

      return self.items.filter(item => doPolygonsIntersect(item.getPolygon(), [tl, tr, br, bl]))
    }
  }))

export default elements
