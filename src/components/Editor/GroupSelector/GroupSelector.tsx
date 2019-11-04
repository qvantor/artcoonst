import React from 'react'
import styles from './GroupSelector.module.scss'
import { inject } from '@/store'
import Selectable from './Selectable'
import { CanvasContext } from '@/components/Canvas/Canvas'

const GroupSelector = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { getCanvas } = React.useContext(CanvasContext)
  const { cleanSelection } = inject(store => store.selection)
  const getOverlap = inject(store => store.elements.getOverlap)

  React.useEffect(() => {
    const canvas = getCanvas()
    if (!ref.current || !canvas) return () => {}
    const selector = new Selectable(ref.current, canvas)

    selector
      .on('move', ({ x, y, width, height }) => getOverlap({ x, y, width, height }))
      .on('moveEnd', console.log)

    return selector.destroy
  })

  return (
    <div onClick={cleanSelection} className={styles.groupSelector} ref={ref} />
  )
}

export default GroupSelector
