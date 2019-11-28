import React from 'react'
import FontSize from './FontSize'
import styles from './Text.module.scss'
import { textType } from '@/store/types/elements'

interface Props {
  selected: textType
}

const Text = ({ selected }: Props) => {
  const buttons = [
    {
      name: 'B',
      click: () => document.execCommand('bold'),
      status: () => document.queryCommandState('bold')
    }, {
      name: <i>I</i>,
      click: () => document.execCommand('italic'),
      status: () => document.queryCommandState('italic')
    }]
  return (
    <div className='d-flex px-2'>
      <FontSize selected={selected} />
      {buttons.map((item, i) =>
        <button
          className={styles.toolbarButton}
          key={i}
          onClick={item.click}>
          {item.name}
        </button>)}
    </div>
  )
}

export default Text
