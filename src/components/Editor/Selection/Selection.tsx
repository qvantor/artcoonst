import React from 'react'
import { CanvasContext } from '@/components/Canvas/Canvas'
import { inject } from '@/store'
import Moveable, {
  OnDragStart, OnDrag, OnDragGroupStart, OnDragGroup,
  OnResize, OnResizeStart, OnResizeGroupStart, OnResizeGroup,
  OnRotateStart, OnRotate, OnRotateGroupStart, OnRotateGroup,
  OnClick
} from 'react-moveable'

const Selection = () => {
  const { width, height, getCanvas } = React.useContext(CanvasContext)
  const { elements, params, getElementById, selected, editing, setEditing } = inject(store => ({
    elements: store.elements.getElements(),
    params: store.elements.params,
    getElementById: store.elements.getElementById,

    selected: store.selection.getSelected(),
    editing: store.selection.getEditing(),
    setEditing: store.selection.setEditing
  }))
  const canvas = getCanvas()
  if (selected.length === 0 || !canvas) return null
  const { style } = selected[0]
  const target = selected.map(item => document.querySelector(`#${item.id}`) as HTMLElement)

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

  const onClick = (e: OnClick) => {
    const element = getElementById(e.target.id)
    if (!element) return // error log here
    const pm = params.get(element.type)
    if (!pm) return // error log here
    if (pm.editable) setEditing(element.id)
  }

  const elementsSelected = elements
    .filter(item => selected.find(sel => sel.id !== item.id))
    .map((item) => document.querySelector(`#${item.id}`)) as Element[]

  return <Moveable
    container={canvas}
    target={target}
    origin={false}
    keepRatio={true}
    dragArea={!editing}
    draggable={!editing}
    onDragStart={onDragStart}
    onDrag={onDrag}
    onDragGroupStart={onDragGroupStart}
    onDragGroup={onDragGroup}
    resizable={true}
    onResizeStart={onResizeStart}
    onResize={onResize}
    onResizeGroupStart={onResizeGroupStart}
    onResizeGroup={onResizeGroup}
    rotatable={true}
    onRotateStart={onRotateStart}
    onRotate={onRotate}
    onRotateGroupStart={onRotateGroupStart}
    onRotateGroup={onRotateGroup}
    snappable={!editing}
    snapCenter={true}
    onClick={onClick}
    elementGuidelines={elementsSelected}
    verticalGuidelines={[0, width / 2, width]}
    horizontalGuidelines={[0, height / 2, height]} />
}

export default Selection
