import * as React from 'react'
import Selection from './Selection/Selection'
import GroupSelector from './GroupSelector/GroupSelector'

const Editor = () => {
  return (
    <React.Fragment>
      <Selection />
      <GroupSelector />
    </React.Fragment>
  )
}

export default Editor
