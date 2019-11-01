import * as React from 'react'
import { imageType } from '@/store/types/elements'

const Image = ({ src, name, type, ...rest }: imageType) => {
  return (
    <img src={src} alt={name} {...rest} />
  )
}

export default Image
