import React from 'react'
import styles from './GroupSelector.module.scss'
import { inject } from '@/store'
import Selectable from './Selectable'
import { CanvasContext } from '@/components/Canvas/Canvas'

const GroupSelector = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { getCanvas } = React.useContext(CanvasContext)
  React.useEffect(() => {
    const canvas = getCanvas()
    if (!ref.current || !canvas) return () => {}
    const selector = new Selectable(ref.current, canvas)

    selector
      .on('change', ({ x, y, width, height }) => {
        console.log(x, y, width, height)
      })

    return selector.destroy
  })
  const cleanSelection = inject((store) => store.selection.cleanSelection)
  return (
    <div
      onClick={cleanSelection}
      className={styles.groupSelector} ref={ref} />
  )
}

export default GroupSelector
