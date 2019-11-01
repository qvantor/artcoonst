import { element, style } from './types/elements'
import { point } from './types/primitives'
import nanoid from 'nanoid'

interface ImageParams {
  src: string,
  name?: string
}

export const createStyle = () => {
  return style.create({
    transform: {
      translate: point.create({})
    }
  })
}

export const createImage = (params: ImageParams) => {
  return element.create(Object.assign({
    id: `i${nanoid(7)}`,
    type: 'image',
    name: 'Image',
    style: createStyle()
  }, params))
}
