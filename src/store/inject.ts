import * as React from 'react'
import { storeType } from './'
import { MobXProviderContext, useObserver } from 'mobx-react'

export default function <T> (selector: (store: storeType) => T) {
  return useObserver(() => selector(React.useContext(MobXProviderContext)))
}

