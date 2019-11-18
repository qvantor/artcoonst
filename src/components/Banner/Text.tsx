import * as React from 'react'
import { textType } from '@/store/types/elements'
import { inject } from '@/store'
import TextEditor from './TextEditor'

const Text = (props: textType) => {
  const { text, name, type, id, ...rest } = props
  const editing = inject(store => store.selection.getEditing())
  return (<div id={id} {...rest}>
    {editing && editing.id === id
      ? <TextEditor text={text} id={id} />
      : <div dangerouslySetInnerHTML={{ __html: text }} />}
  </div>)
}

export default Text
