import * as React from 'react'
import { elementType } from '@/store/types/elements'
import { elementTypes } from '@/store/constants'
import image from './Image'
import text from './Text'
import { inject } from '@/store'

interface IProps {
  item: elementType
}

const elementsComponent: { [key: string]: React.FunctionComponent<any> } = {
  [elementTypes.image]: image,
  [elementTypes.text]: text
}

const Element = ({ item }: IProps) => {
  const selectOne = inject((store) => store.selection.selectOne)
  const style = inject(() => item.style.toReactCss())
  const snap = inject(() => item.getElementSnap())
  const Component = elementsComponent[item.type]
  const onMouseDown = () => selectOne(item.id)
  return (
    <Component {...snap} style={style} onMouseDown={onMouseDown} />
  )
}

export default Element
