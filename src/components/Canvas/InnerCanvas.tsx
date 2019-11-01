import React from 'react'
import styles from './InnerCanvas.module.scss'
import Banner from '../Banner/Banner'
import { inject } from '@/store'

const InnerCanvas = () => {
  const cleanSelection = inject((store) => store.selection.cleanSelection)
  return (
    <div className={styles.innerCanvas} onClick={cleanSelection}>
      <Banner />
    </div>
  )
}

export default InnerCanvas
