import React from 'react'
import styles from './GroupSelector.module.scss'
import { useStore } from '@/store'
import Selectable from './Selectable'
import { CanvasContext } from '@/components/Canvas/Canvas'

const GroupSelector = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { getCanvas } = React.useContext(CanvasContext)
  const { selection: { cleanSelection, setPreview, previewToSelection }, elements: { getOverlap } } = useStore()

  React.useEffect(() => {
    const canvas = getCanvas()
    if (!ref.current || !canvas) return () => {}
    const selector = new Selectable(ref.current, canvas)

    selector
      .on('move',
        ({ x, y, width, height }) =>
          setPreview(getOverlap({ x, y, width, height }).map(item => item.id)))
      .on('moveEnd', (params) => {
        if (params.click) cleanSelection()
        else previewToSelection()
      })

    return selector.destroy
  })

  return (
    <div className={styles.groupSelector} ref={ref} />
  )
}

export default GroupSelector
