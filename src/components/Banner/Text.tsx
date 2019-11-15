import * as React from 'react'
import { textType } from '@/store/types/elements'
import { inject } from '@/store'
import { init, exec } from 'pell'

const TextEditor = ({ text, id }: { text: string, id: string }) => {
  const getElementById = inject(store => store.elements.getElementById)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const element = getElementById(id) as textType
    if (ref.current !== null && element !== undefined) {
      init({
        element: ref.current,
        onChange: (text) => element.setText(text),
        actions: []
      })
    } // error log here (else)
  }, [id])
  return <div ref={ref} />
}

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
