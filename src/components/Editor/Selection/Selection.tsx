import React from 'react'
import SelectionController from './SelectionController'
import { inject } from '@/store'
import { CanvasContext } from '@/components/Canvas/Canvas'

const Selection = () => {
  const { getCanvas } = React.useContext(CanvasContext)
  const canvas = getCanvas()
  const selected = inject(store => store.selection.getSelected())
  if (selected.length === 0 || !canvas) return null // error log here

  return (
    <SelectionController selected={selected} canvas={canvas} />
  )
}

export default Selection
