import { types, getSnapshot } from 'mobx-state-tree'
import { elementTypesArray } from '@/store/constants'
import { point } from '../primitives'
import style from './style.type'

export default types
  .model('element', {
    id: types.identifier,
    name: types.string,
    type: types.enumeration('type', elementTypesArray),
    style
  })
  .views(self => ({
    getElementSnap () {
      return getSnapshot(self)
    },
    getPolygon () {
      const { width, height, transform: { translate, rotate, scale } } = self.style
      const center = { x: (width / 2) + translate.x, y: (height / 2) + translate.y }
      const scaledWidth = width * scale[0]
      const scaledHeight = height * scale[1]
      const x = translate.x - (scaledWidth - width) / 2
      const y = translate.y - (scaledHeight - height) / 2
      const tl = point.create({ x, y }).rotate(center, rotate)
      const tr = point.create({ x: x + scaledWidth, y }).rotate(center, rotate)
      const bl = point.create({ x, y: y + scaledHeight }).rotate(center, rotate)
      const br = point.create({ x: x + scaledWidth, y: y + scaledHeight }).rotate(center, rotate)
      return [tl, tr, br, bl]
    }
  }))
