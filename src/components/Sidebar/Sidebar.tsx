import * as React from 'react'
import ImagesExplorer from '../ImagesExplorer/ImagesExplorer'
import TextExplorer from '../TextExplorer/TextExplorer'

const Sidebar = () => {
  return (
    <div>
      <TextExplorer />
      <ImagesExplorer />
    </div>
  )
}

export default Sidebar
