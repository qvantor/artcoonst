import React from 'react'
import { useInject } from '@/store'
import SelectionController from './SelectionController'
import { CanvasContext } from '@/components/Canvas/Canvas'

const Selection = () => {
  const { getCanvas } = React.useContext(CanvasContext)
  const canvas = getCanvas()
  const selected = useInject(store => store.selection.selected.slice())

  if (selected.length === 0 || !canvas) return null // error log here

  return (
    <SelectionController selected={selected} canvas={canvas} />
  )
}

export default Selection
