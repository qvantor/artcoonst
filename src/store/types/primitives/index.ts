import { Instance, SnapshotIn, types } from 'mobx-state-tree'

export const point = types
  .model({
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0)
  })
  .actions(self => ({
    rotate (center: { x: number, y: number }, angle: number) {
      const theta = angle * Math.PI / 180
      const tempX = self.x - center.x
      const tempY = self.y - center.y
      const rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta)
      const rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta)
      self.x = rotatedX + center.x
      self.y = rotatedY + center.y
      return self
    }
  }))

export type pointType = Instance<typeof point>
export type pointInType = SnapshotIn<typeof point>
