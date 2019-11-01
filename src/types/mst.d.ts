import { IAnyType } from 'mobx-state-tree'
import { ObservableMap } from 'mobx'

declare module 'mobx-state-tree' {
  interface IMSTMap<IT extends IAnyType>
    extends ObservableMap<string, IT['Type']> {}
}
