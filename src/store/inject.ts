import * as React from 'react'
import { storeType } from './'
import { MobXProviderContext, useObserver } from 'mobx-react'

export function useStore (): storeType {
  return React.useContext(MobXProviderContext)
}

export function useInject<T> (selector: (store: storeType) => T) {
  const store = useStore()
  return useObserver(() => selector(store))
}
