import React from 'react'
import Color from './Color'
import BoldItalic from './BoldItalic'
import Aligment from './Aligment'
import FontSize from './FontSize'
import { textType } from '@/store/types/elements'

interface Props {
  selected: textType
}

const Text = ({ selected }: Props) => {
  return (
    <div className='d-flex px-2'>
      <FontSize selected={selected} />
      <Color selected={selected} />
      <BoldItalic selected={selected} />
      <Aligment selected={selected} />
    </div>
  )
}

export default Text
