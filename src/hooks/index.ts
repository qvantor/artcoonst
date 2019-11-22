import * as React from 'react'

export const checkRef = <T, E = void> (ref: React.RefObject<T>, fn: (element: T) => E) =>
  ref.current && fn(ref.current)
