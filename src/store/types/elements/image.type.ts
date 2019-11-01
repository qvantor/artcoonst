import { types } from 'mobx-state-tree'

import element from './element.type'

const imageType = types
  .model({
    src: types.string
  })

const image = types
  .compose(element, imageType)
  .named('image')

export default image
