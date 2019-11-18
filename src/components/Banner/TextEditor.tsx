import { inject } from 'mobx-react'
import * as React from 'react'
import { storeType } from '@/store'
import { textType } from '@/store/types/elements'

interface TextEditorProps {
  text: string,
  id: string,
  elements: storeType['elements']
}

class TextEditor extends React.Component<TextEditorProps> {
  ref: React.RefObject<HTMLDivElement>

  constructor (props: TextEditorProps) {
    super(props)
    this.ref = React.createRef()
  }

  shouldComponentUpdate (nextProps: Readonly<TextEditorProps>) {
    return nextProps.text === this.props.text
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
    const { text } = this.props

    return (
      <div
        onInput={this.onInput}
        contentEditable
        dangerouslySetInnerHTML={{ __html: text }}
        ref={this.ref} />
    )
  }
}

export default inject(store => ({ elements: store.elements }))(TextEditor)
