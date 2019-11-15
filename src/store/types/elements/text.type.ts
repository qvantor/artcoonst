import { types } from 'mobx-state-tree'
import element from './element.type'

const textType = types
  .model('textType', {
    text: types.string
  })
  .actions(self => ({
    setText (text: string) {
      self.text = text
    }
  }))

const text = types
  .compose(element, textType)
  .named('text')

export default text
