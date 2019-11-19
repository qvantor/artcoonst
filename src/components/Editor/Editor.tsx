import * as React from 'react'
import Moveable from './Selection/Selection'
import SelectPreview from './SelectPreview/SelectPreview'
import GroupSelector from './GroupSelector/GroupSelector'

const Editor = () => {
  return (
    <React.Fragment>
      <Moveable />
      <SelectPreview />
      <GroupSelector />
    </React.Fragment>
  )
}

export default Editor
