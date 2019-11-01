import * as React from 'react'
import { textType } from '@/store/types/elements'

const Text = ({ text, name, type, ...rest }: textType) => {
  return (
    <div {...rest}>{text}</div>
  )
}

export default Text
