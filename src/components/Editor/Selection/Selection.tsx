import React from 'react'
import { CanvasContext } from '@/components/Canvas/Canvas'
import { inject } from '@/store'
import Moveable, { OnDragStart, OnDrag, OnResize, OnResizeStart, OnRotateStart, OnRotate } from 'react-moveable'

const Selection = () => {
  const { width, height, getCanvas } = React.useContext(CanvasContext)
  const selected = inject(store => store.selection.getSelected())
  const elements = inject(store => store.elements.getElementsArray())
  const canvas = getCanvas()
  if (selected.length !== 1 || !canvas) return null
  const { id, style } = selected[0]
  const target = document.querySelector(`#${id}`) as HTMLElement

  const onDragStart = ({ set }: OnDragStart) => {
    set([style.transform.translate.x, style.transform.translate.y, 0])
  }
  const onDrag = ({ beforeTranslate }: OnDrag) => {
    style.setTranslate({ x: beforeTranslate[0], y: beforeTranslate[1] })
  }

  const onResizeStart = ({ dragStart }: OnResizeStart) => {
    if (dragStart) dragStart.set([style.transform.translate.x, style.transform.translate.y])
  }
  const onResize = ({ width, height, drag: { beforeTranslate } }: OnResize) => {
    style.setStyle({ width, height })
    style.setTranslate({ x: beforeTranslate[0], y: beforeTranslate[1] })
  }

  const onRotateStart = ({ set }: OnRotateStart) => {
    set(style.transform.rotate)
  }
  const onRotate = ({ beforeRotate }: OnRotate) => {
    style.setRotate(beforeRotate)
  }

  const elementsSelected = elements
    .filter(item => item.id !== id)
    .map((item) => document.querySelector(`#${item.id}`)) as Element[]

  return <Moveable
    container={canvas}
    target={target}
    origin={false}
    keepRatio={true}
    dragArea={true}
    draggable={true}
    onDragStart={onDragStart}
    onDrag={onDrag}
    resizable={true}
    onResizeStart={onResizeStart}
    onResize={onResize}
    rotatable={true}
    onRotateStart={onRotateStart}
    onRotate={onRotate}
    snappable={true}
    snapCenter={true}
    elementGuidelines={elementsSelected}
    verticalGuidelines={[0, width / 2, width]}
    horizontalGuidelines={[0, height / 2, height]} />
}

export default Selection
