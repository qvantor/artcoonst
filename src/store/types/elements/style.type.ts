import { types, getSnapshot } from 'mobx-state-tree'

import { point, pointInType, pointType } from '../primitives'

export const transform = types
  .model('transform', {
    translate: point,
    scale: types.optional(types.array(types.number), [1, 1]),
    rotate: types.optional(types.number, 0)
  })
  .views(self => ({
    toCss () {
      return Object.keys(self).reduce((sum, key, index, src) => {
        let value = ''
        if (key === 'rotate') {
          value = `${key}(${self[key]}deg) `
        } else if (key === 'translate') {
          value = `${key}(${self[key].x}px, ${self[key].y}px) `
        } else if (key === 'scale') value = `${key}(${self[key][0]}, ${self[key][1]}) `

        if (index === src.length - 1) value = value.substring(0, value.length - 1)
        return sum + value
      }, '')
    }
  }))

export default types
  .model('style', {
    width: types.number,
    height: types.number,
    transform
  })
  .actions(self => ({
    setStyle (params: Partial<typeof self>) {
      self = Object.assign(self, params)
    },
    setRotate (rotate: number) {
      self.transform.rotate = rotate
    },
    setTranslate (translate: pointInType) {
      self.transform.translate = translate as pointType
    }
  }))
  .views(self => ({
    toReactCss () {
      return Object.assign({}, getSnapshot(self), { transform: self.transform.toCss() })
    },
    toCss (keyList?: string[]) {
      const numberFields = ['opacity']
      return Object.keys(self).reduce((sum, key) => {
        // @ts-ignore
        const value = self[key]
        if (value === undefined) return sum
        if (key === 'transform') {
          return sum += `transform:${value.toCss()};`
        }
        const name = key.replace(/([A-Z])/, (one) => `-${one.toLowerCase()}`)
        const finalValue =
          typeof value === 'number'
            ? numberFields.indexOf(key) === -1 ? `${value}px` : value
            : value
        sum += `${name}:${finalValue};`
        return sum
      }, '')
    }
  }))
