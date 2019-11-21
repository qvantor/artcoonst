import { inject } from 'mobx-react'
import * as React from 'react'
import { storeType } from '@/store'
import { textType } from '@/store/types/elements'
import { checkRef } from '@/hooks'

interface TextEditorProps {
  text: string,
  id: string,
  elements: storeType['elements'],
  width: number,
  editing?: any
}

class TextEditor extends React.Component<TextEditorProps> {
  ref: React.RefObject<HTMLDivElement>

  constructor (props: TextEditorProps) {
    super(props)
    this.ref = React.createRef()
  }

  shouldComponentUpdate (nextProps: Readonly<TextEditorProps>) {
    return nextProps.editing !== this.props.editing
  }

  onInput = () => {
    checkRef<HTMLDivElement>(this.ref, (htmlElement) => {
      const { elements, id } = this.props
      const element = elements.getElementById(id) as textType
      element.style.setStyle({ height: htmlElement.clientHeight })
      element.setText(htmlElement.innerHTML)
    })
  }

  render () {
    const { text, id, editing } = this.props

    return (
      <div
        onInput={this.onInput}
        contentEditable={editing && editing.id === id}
        dangerouslySetInnerHTML={{ __html: text }}
        ref={this.ref} />
    )
  }
}

export default inject(store => ({ elements: store.elements }))(TextEditor)
