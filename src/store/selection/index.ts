import { types, cast, getSnapshot } from 'mobx-state-tree'
import { element, elementType } from '../types/elements'

const selection = types
  .model('selection', {
    selected: types.array(types.reference(element)),
    preview: types.array(types.reference(element)),
    editing: types.maybe(types.reference(element))
  })
  .actions(self => ({
    selectOne (id: string) {
      if (self.selected.find(item => item.id === id)) return
      self.selected = cast([id])
      self.editing = undefined
    },
    select (ids: string[]) {
      self.selected.push(...ids)
      self.editing = undefined
    },
    cleanSelection () {
      self.selected = cast([])
      self.editing = undefined
    },
    setPreview (ids: string[]) {
      self.preview = cast(ids)
      self.editing = undefined
    },
    previewToSelection () {
      self.selected = cast(getSnapshot(self.preview))
      self.preview = cast([])
    },
    setEditing (id: string) {
      // @ts-ignore
      self.editing = id
    }
  }))
  .views(self => ({
    getSelected (): elementType[] {
      return self.selected.length > 0 ? self.selected : []
    },
    getPreview (): elementType[] {
      return self.preview.length > 0 ? self.preview : []
    },
    getEditing () {
      return self.editing
    }
  }))

export default selection
