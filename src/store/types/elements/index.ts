import { Instance, types } from 'mobx-state-tree'
import image from './image.type'
import text from './text.type'
import style from './style.type'

export const element = types.union(image, text)

export { style }

export type imageType = Instance<typeof image>
export type textType = Instance<typeof text>
export type elementType = imageType | textType
