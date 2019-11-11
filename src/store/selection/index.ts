import { types, cast } from 'mobx-state-tree'
import { element, elementType } from '../types/elements'

const selection = types
  .model('selection', {
    selected: types.array(types.reference(element)),
    preview: types.array(types.reference(element))
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
    },
    setPreview (ids: string[]) {
      self.preview = cast(ids)
    },
    previewToSelection () {
      self.selected = self.preview
      self.preview = cast([])
    }
  }))
  .views(self => ({
    getSelected () {
      return self.selected.length > 0 ? self.selected : []
    },
    getPreview (): elementType[] {
      return self.preview.length > 0 ? self.preview : []
    }
  }))

export default selection
