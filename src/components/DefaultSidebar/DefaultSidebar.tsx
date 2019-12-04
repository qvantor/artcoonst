import React from 'react'
import TextExplorer from '@/components/TextExplorer/TextExplorer'
import ImagesExplorer from '@/components/ImagesExplorer/ImagesExplorer'

const DefaultSidebar = () => {
  return (
    <div>
      <TextExplorer />
      <ImagesExplorer />
    </div>
  )
}

export default DefaultSidebar
