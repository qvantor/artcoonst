import * as React from 'react'
import Selection from './Selection/Selection'
import GroupSelection from './GroupSelection/GroupSelection'
import SelectPreview from './SelectPreview/SelectPreview'
import GroupSelector from './GroupSelector/GroupSelector'

const Editor = () => {
  return (
    <React.Fragment>
      <Selection />
      <GroupSelection />
      <SelectPreview />
      <GroupSelector />
    </React.Fragment>
  )
}

export default Editor
