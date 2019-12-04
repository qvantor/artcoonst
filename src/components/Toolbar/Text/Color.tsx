import React from 'react'
import { useStore } from '@/store'
import styles from './BoldItalic.module.scss'
import { textType } from '@/store/types/elements'

interface Props {
  selected: textType
}

const Color = ({ selected }: Props) => {
  const { app: { toggleSidebar } } = useStore()
  return (
    <div className={styles.toolbarButton} onClick={() => toggleSidebar('color')}>A</div>
  )
}

export default Color
