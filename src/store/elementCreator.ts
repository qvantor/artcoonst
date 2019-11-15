import { element, style, styleType, imageType, textType } from './types/elements'
import { point } from './types/primitives'
import nanoid from 'nanoid'
import { PartialExcept } from '@/types'

export const createStyle = (styleParams: Partial<styleType>) => {
  return style.create(Object.assign({
    width: 0,
    height: 0,
    transform: {
      translate: point.create({})
    }
  }, styleParams))
}

export const createImage = (
  params: PartialExcept<imageType, 'src'>,
  style: PartialExcept<styleType, 'width' | 'height'>) => {
  return element.create(Object.assign({
    id: `i${nanoid(7)}`,
    type: 'image',
    name: 'Image',
    style: createStyle(style)
  }, params))
}

export const createText = (
  params: PartialExcept<textType, 'text'>,
  style: PartialExcept<styleType, 'width' | 'height'>) => {
  return element.create(Object.assign({
    id: `t${nanoid(7)}`,
    type: 'text',
    name: 'Text',
    style: createStyle(style)
  }, params))
}
