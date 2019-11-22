import React from 'react'
import styles from './SelectPreview.module.scss'
import { useInject } from '@/store'

const SelectPreview = () => {
  const preview = useInject(store => store.selection.preview.slice())
  return (
    <div className={styles.preview}>
      {preview.map(({ id, style: { width, height, transform } }) => {
        return <div key={id} style={{ width, height, transform: transform.toCss() }} />
      })}
    </div>
  )
}

export default SelectPreview
