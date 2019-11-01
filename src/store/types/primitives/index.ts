import { Instance, types } from 'mobx-state-tree'

export const point = types
  .model({
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0)
  })

export type pointType = Instance<typeof point>
