import * as React from 'react'
import Default from '@/components/DefaultSidebar/DefaultSidebar'
import Color from '@/components/ColorSidebar/ColorSidebar'
import { useInject } from '@/store'

const Sidebar = () => {
  const sidebar = useInject(store => store.app.sidebar)
  const sidebars = { 'default': Default, 'color': Color }
  const SidebarComponent: typeof Default = sidebars[sidebar as 'default'] || Default
  return (<SidebarComponent />)
}

export default Sidebar
