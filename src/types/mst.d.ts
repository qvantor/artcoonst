import { IAnyType } from 'mobx-state-tree'
import { ObservableMap } from 'mobx'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare module 'mobx-react' {
  export function inject<D extends object> (
    mapStoreToProps: (store: IRootStore) => D
  ): <A extends D>(
    component: React.ComponentType<A> | React.SFC<A>
  ) => React.SFC<Omit<A, keyof D> & Partial<D>> & IWrappedComponent<A>;
}

declare module 'mobx-state-tree' {
  interface IMSTMap<IT extends IAnyType>
    extends ObservableMap<string, IT['Type']> {}
}
