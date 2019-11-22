import * as React from 'react'
import Element from './Element'
import { useInject } from '@/store'

const Banner = () => {
  const items = useInject(store => store.elements.items.slice())
  return (
    <React.Fragment>
      {items.map((item, i) => <Element key={i} item={item} />)}
    </React.Fragment>
  )
}

export default Banner
