import * as React from 'react'
import Element from './Element'
import { inject } from '@/store'

const Banner = () => {
  const items = inject((store) => store.elements.getElementsArray())
  return (
    <React.Fragment>
      {items.map((item, i) => <Element key={i} item={item} />)}
    </React.Fragment>
  )
}

export default Banner
