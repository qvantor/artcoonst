import React from 'react'
import { textType } from '@/store/types/elements'

interface Props {
  selected: textType
}

const Text = () => {
  const buttons = [
    {
      name: 'Bold',
      click: () => document.execCommand('bold'),
      status: () => document.queryCommandState('bold')
    }, {
      name: 'Italic',
      click: () => document.execCommand('italic'),
      status: () => document.queryCommandState('italic')
    }]
  return (
    <div>
      {buttons.map(item => <button key={item.name} onClick={item.click}>{item.name}</button>)}
    </div>
  )
}

export default Text
