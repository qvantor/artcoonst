import { types } from 'mobx-state-tree'
import element from './element.type'

const textType = types
  .model('textType', {
    text: types.string
  })

const text = types
  .compose(element, textType)
  .named('text')

export default text
