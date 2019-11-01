import { types, cast } from 'mobx-state-tree'
import { element } from '../types/elements'

const selection = types
  .model('selection', {
    selected: types.array(types.reference(element))
  })
  .actions(self => ({
    selectOne (id: string) {
      self.selected = cast([id])
    },
    select (ids: string[]) {
      self.selected.push(...ids)
    },
    cleanSelection () {
      self.selected = cast([])
    }
  }))
  .views(self => ({
    getSelected () {
      return self.selected.length > 0 ? self.selected : []
    }
  }))

export default selection
