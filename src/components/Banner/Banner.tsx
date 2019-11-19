import * as React from 'react'
import Element from './Element'
import { useStore } from '@/store'
import { observer } from 'mobx-react'

const Banner = () => {
  const { elements: { items } } = useStore()
  return (
    <React.Fragment>
      {items.map((item, i) => <Element key={i} item={item} />)}
    </React.Fragment>
  )
}

export default observer(Banner)
