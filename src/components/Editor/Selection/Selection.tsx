import React from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react'
import SelectionController from './SelectionController'
import { CanvasContext } from '@/components/Canvas/Canvas'

const Selection = () => {
  const { getCanvas } = React.useContext(CanvasContext)
  const canvas = getCanvas()
  const { selection: { selected } } = useStore()

  if (selected.length === 0 || !canvas) return null // error log here

  return (
    <SelectionController selected={selected} canvas={canvas} />
  )
}

export default observer(Selection)
