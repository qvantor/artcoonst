import React from 'react'
import cn from 'classnames'
import { eC, useStore } from '@/store/'
import style from './TextExplorer.module.scss'

const TextExplorer = () => {
  const { elements: { addElement } } = useStore()
  const texts = [
    {
      text: 'Heading',
      style: { fontSize: 26, width: 98, height: 39 }
    }, {
      text: 'Subheading',
      style: { fontSize: 18, width: 98, height: 39 }
    }, {
      text: 'Body text',
      style: { fontSize: 16, width: 98, height: 39 }
    }]
  const onClick = (item: typeof texts[0]) => () => {
    addElement(eC.createText({ text: item.text }, item.style))
  }
  return (
    <div className={cn('mb-4', style.textExplorer)}>
      {texts.map(item => <div onClick={onClick(item)} key={item.text} style={item.style}>{item.text}</div>)}
    </div>
  )
}

export default TextExplorer
