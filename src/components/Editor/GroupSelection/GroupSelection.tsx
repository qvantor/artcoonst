import React from 'react'
import { CanvasContext } from '@/components/Canvas/Canvas'
import { inject } from '@/store'
import Moveable, {
  OnDragGroupStart, OnDragGroup,
  OnResizeGroupStart, OnResizeGroup,
  OnRotateGroupStart, OnRotateGroup
} from 'react-moveable'

const GroupSelection = () => {
  const { width, height, getCanvas } = React.useContext(CanvasContext)
  const selected = inject(store => store.selection.getSelected())
  const canvas = getCanvas()
  if (selected.length <= 1 || !canvas) return null
  const target = selected.map(item => document.querySelector(`#${item.id}`) as HTMLElement)

  const onDragGroupStart = ({ events }: OnDragGroupStart) => {
    events.forEach((ev, i) => {
      ev.set([selected[i].style.transform.translate.x, selected[i].style.transform.translate.y])
    })
  }
  const onDragGroup = ({ events }: OnDragGroup) => {
    events.forEach(({ beforeTranslate }, i) => {
      selected[i].style.setTranslate({ x: beforeTranslate[0], y: beforeTranslate[1] })
    })
  }

  const onResizeGroupStart = ({ events }: OnResizeGroupStart) => {
    events.forEach((ev, i) => {
      ev.setOrigin(['%', '%'])
      const { style } = selected[i]

      ev.dragStart && ev.dragStart.set([style.transform.translate.x, style.transform.translate.y])
    })
  }

  const onResizeGroup = ({ events }: OnResizeGroup) => {
    events.forEach(({ width, height, drag: { beforeTranslate } }, i) => {
      const { style } = selected[i]
      style.setStyle({ width, height })
      style.setTranslate({ x: beforeTranslate[0], y: beforeTranslate[1] })
    })
  }

  const onRotateGroupStart = ({ events }: OnRotateGroupStart) => {
    events.forEach(({ set, dragStart }, i) => {
      const { style } = selected[i]
      set(style.transform.rotate)
      dragStart && dragStart.set([style.transform.translate.x, style.transform.translate.y])
    })
  }

  const onRotateGroup = ({ events }: OnRotateGroup) => {
    events.forEach(({ beforeRotate, drag: { beforeTranslate } }, i) => {
      const { style } = selected[i]
      style.setRotate(beforeRotate)
      style.setTranslate({ x: beforeTranslate[0], y: beforeTranslate[1] })
    })
  }

  return (
    <Moveable
      container={canvas}
      target={target}
      origin={false}
      keepRatio={true}
      dragArea={true}
      draggable={true}
      onDragGroupStart={onDragGroupStart}
      onDragGroup={onDragGroup}
      resizable={true}
      onResizeGroupStart={onResizeGroupStart}
      onResizeGroup={onResizeGroup}
      rotatable={true}
      onRotateGroupStart={onRotateGroupStart}
      onRotateGroup={onRotateGroup}
      snappable={true}
      snapCenter={true}
      // elementGuidelines={elementsSelected}
      verticalGuidelines={[0, width / 2, width]}
      horizontalGuidelines={[0, height / 2, height]} />
  )
}

export default GroupSelection
