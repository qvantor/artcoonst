import React from 'react'
import cn from 'classnames'
import { useWatchElement } from '@/hooks'
import styles from './BoldItalic.module.scss'
import { textType } from '@/store/types/elements'
import { useInject } from '@/store'

interface IProps {
  selected: textType
}

const BoldItalic = ({ selected: { id } }: IProps) => {
  const [statuses, setStatuses] = React.useState <boolean[]>([])
  const editing = useInject(store => store.selection.editing)
  const onChange = () => {
    const statusList = buttons.map(item => editing ? item.status() : false)
    setStatuses(statusList)
  }
  const buttons = [
    {
      name: <b>B</b>,
      click: () => {
        document.execCommand('bold')
        onChange()
      },
      status: () => document.queryCommandState('bold')
    }, {
      name: <i>I</i>,
      click: () => {
        document.execCommand('italic')
        onChange()
      },
      status: () => document.queryCommandState('italic')
    }]
  useWatchElement(id, onChange)
  React.useEffect(onChange, [id])
  return (
    <React.Fragment>
      {buttons.map((item, i) =>
        <button
          className={cn(styles.toolbarButton, { [styles.selected]: statuses[i] })}
          key={i}
          onClick={item.click}>
          {item.name}
        </button>)}
    </React.Fragment>
  )
}

export default BoldItalic
