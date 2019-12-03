import React from 'react'
import cn from 'classnames'
import { useObserver } from 'mobx-react'
import styles from './BoldItalic.module.scss'
import { textType } from '@/store/types/elements'

interface IProps {
  selected: textType
}

const aligment = [
  {
    name: 'left',
    icon: 'fi flaticon-text'
  }, {
    name: 'center',
    icon: 'fi flaticon-align-center'
  }, {
    name: 'right',
    icon: 'fi flaticon-align-right'
  }]

const Aligment = ({ selected: { style } }: IProps) => {
  const align = useObserver(() => style.textAlign || 'left')
  const index = aligment.findIndex(item => item.name === align)
  const current = aligment[index]
  const onClick = () => {
    const nextIndex = index + 1 > aligment.length - 1 ? 0 : index + 1
    style.setStyle({ textAlign: aligment[nextIndex].name as 'center' })
  }
  if (!current) return null
  return (<i onClick={onClick} className={cn(styles.toolbarButton, current.icon)} />)
}

export default Aligment
