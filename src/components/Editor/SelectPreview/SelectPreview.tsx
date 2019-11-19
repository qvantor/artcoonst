import React from 'react'
import { observer } from 'mobx-react'
import styles from './SelectPreview.module.scss'
import { useStore } from '@/store'

const SelectPreview = () => {
  const { selection: { preview } } = useStore()
  return (
    <div className={styles.preview}>
      {preview.map(({ id, style: { width, height, transform } }) => {
        return <div key={id} style={{ width, height, transform: transform.toCss() }} />
      })}
    </div>
  )
}

export default observer(SelectPreview)
