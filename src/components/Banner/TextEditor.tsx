import { inject } from 'mobx-react'
import * as React from 'react'
import { storeType } from '@/store'
import { textType } from '@/store/types/elements'

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
    if (nextProps.width !== this.props.width) {
      const { elements, id } = this.props
      const htmlElement = this.ref.current
      if (htmlElement) {
        const element = elements.getElementById(id) as textType
        const { height } = htmlElement.getBoundingClientRect()
        element.style.setStyle({ height })
      }
      return false
    }
    return nextProps.editing !== this.props.editing
  }

  onInput = () => {
    const { elements, id } = this.props
    const htmlElement = this.ref.current
    if (htmlElement) {
      const element = elements.getElementById(id) as textType
      if (!element) return // error log here
      const { height } = htmlElement.getBoundingClientRect()
      element.style.setStyle({ height })
      element.setText(htmlElement.innerHTML)
    }
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
