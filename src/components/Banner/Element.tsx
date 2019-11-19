import * as React from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@/store'
import { elementType } from '@/store/types/elements'
import { elementTypes } from '@/store/constants'
import image from './Image'
import text from './Text'

interface IProps {
  item: elementType
}

const elementsComponent: { [key: string]: React.FunctionComponent<any> } = {
  [elementTypes.image]: image,
  [elementTypes.text]: text
}

const Element = ({ item }: IProps) => {
  const { selection: { selectOne } } = useStore()
  const { style } = useObserver(() => ({ style: item.style.toReactCss(), snap: item.getElementSnap() }))
  const Component = elementsComponent[item.type]
  const onMouseDown = () => selectOne(item.id)
  return (
    <Component {...item} style={style} onMouseDown={onMouseDown} />
  )
}

export default Element
