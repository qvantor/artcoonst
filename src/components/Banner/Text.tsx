import * as React from 'react'
import { textType } from '@/store/types/elements'
import { useInject } from '@/store'
import TextEditor from './TextEditor'

const Text = (props: textType) => {
  const { text, name, type, id, style, ...rest } = props
  const editing = useInject(store => store.selection.editing)
  return (<div id={id} style={style} {...rest}>
    <TextEditor text={text} id={id} editing={editing} width={style.width} />
  </div>)
}

export default Text
