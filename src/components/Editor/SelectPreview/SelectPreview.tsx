import React from 'react'
import styles from './SelectPreview.module.scss'
import { inject } from '@/store'

const SelectPreview = () => {
  const selected = inject(store => store.selection.getPreview())
  return (
    <div className={styles.preview}>
      {selected.map(({ id, style: { width, height, transform } }) => {
        return <div key={id} style={{ width, height, transform: transform.toCss() }} />
      })}
    </div>
  )
}

export default SelectPreview
