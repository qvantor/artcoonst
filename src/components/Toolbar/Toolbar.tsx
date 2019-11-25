import React from 'react'
import Text from './Text/Text'
import styles from './Toolbar.module.scss'
import { useInject } from '@/store'
import { elementTypes } from '@/store/constants'

const Toolbar = () => {
  const selected = useInject(store => store.selection.selected.slice())
  let Component = (p: any) => <div />
  if (selected.length === 1) {
    const elements = {
      [elementTypes.text]: Text
    }
    Component = elements[selected[0].type] || Component
  }
  return (
    <div className={styles.toolbar}><Component selected={selected} /></div>
  )
}

export default Toolbar
