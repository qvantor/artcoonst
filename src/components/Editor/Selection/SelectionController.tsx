import React from 'react'
import { CanvasContext } from '@/components/Canvas/Canvas'
import { useInject } from '@/store'
import { elementType } from '@/store/types/elements'
import Moveable, {
  OnDragStart, OnDrag, OnDragGroupStart, OnDragGroup,
  OnResize, OnResizeStart, OnResizeGroupStart, OnResizeGroup,
  OnRotateStart, OnRotate, OnRotateGroupStart, OnRotateGroup,
  OnClick
} from 'react-moveable'
import { elementTypes } from '@/store/constants'

interface SelectionControllerProps {
  canvas: HTMLDivElement,
  selected: elementType[]
}

const defaultMoveable = {
  snappable: true,
  keepRatio: true,
  origin: false,
  snapCenter: true,
  dragArea: true,
  draggable: true,
  rotatable: true,
  resizable: true
}
const SelectionController = ({ canvas, selected }: SelectionControllerProps) => {
  const ref = React.useRef<Moveable>(null)
  const { width, height } = React.useContext(CanvasContext)
  const { snap, elements, params, getElementById, editing, setEditing } = useInject(store => ({
    elements: store.elements.items,
    params: store.elements.params,
    getElementById: store.elements.getElementById,

    editing: store.selection.editing,
    setEditing: store.selection.setEditing,
    snap: selected.length === 1 && selected[0].getElementSnap()
  }))

  React.useEffect(() => {
    if (ref.current) ref.current.moveable.updateRect()
  }, [snap])

  const { style, type } = selected[0]
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

  const rules = {
    [elementTypes.text]: {
      default: {
        keepRatio: false,
        renderDirections: ['e', 'w'],
        onResize: ({ width, drag: { beforeTranslate } }: OnResize) => {
          style.setStyle({ width })
          style.setTranslate({ x: beforeTranslate[0], y: style.transform.translate.y })
        }
      },
      editing: {
        draggable: false,
        dragArea: false,
        snappable: false
      }
    },
    [elementTypes.image]: { default: {}, editing: {} }
  }

  const moveableConfig = selected.length === 1
    ? Object.assign({}, defaultMoveable, rules[type].default, editing && rules[type].editing)
    : defaultMoveable

  return <Moveable
    ref={ref}
    container={canvas}
    target={target}
    onDragStart={onDragStart}
    onDrag={onDrag}
    onDragGroupStart={onDragGroupStart}
    onDragGroup={onDragGroup}
    onResizeStart={onResizeStart}
    onResize={onResize}
    onResizeGroupStart={onResizeGroupStart}
    onResizeGroup={onResizeGroup}
    onRotateStart={onRotateStart}
    onRotate={onRotate}
    onRotateGroupStart={onRotateGroupStart}
    onRotateGroup={onRotateGroup}
    onClick={onClick}
    elementGuidelines={elementsSelected}
    verticalGuidelines={[0, width / 2, width]}
    horizontalGuidelines={[0, height / 2, height]}
    {...moveableConfig} />
}

export default SelectionController
