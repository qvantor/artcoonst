import { types } from 'mobx-state-tree'
import appInital from './app.initial'

const app = types
  .model('app', {
    sidebar: types.enumeration('sidebar', ['default', 'color'])
  })
  .actions(self => ({
    toggleSidebar (sidebar: typeof self.sidebar) {
      self.sidebar = self.sidebar === sidebar ? 'default' : sidebar
    }
  }))

export { appInital }
export default app
