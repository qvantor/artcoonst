import * as React from 'react'
import Selection from './Selection/Selection'
import SelectPreview from './SelectPreview/SelectPreview'
import GroupSelector from './GroupSelector/GroupSelector'

const Editor = () => {
  return (
    <React.Fragment>
      <Selection />
      <SelectPreview />
      <GroupSelector />
    </React.Fragment>
  )
}

export default Editor
