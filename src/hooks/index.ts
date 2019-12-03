import * as React from 'react'

export const checkRef = <T, E = void> (ref: React.RefObject<T>, fn: (element: T) => E) =>
  ref.current && fn(ref.current)

export const useWatchElement = (id: string, onChange: () => void) => {
  React.useEffect(() => {
    const element = document.getElementById(id)
    if (element) {
      element.addEventListener('mouseup', onChange)
      element.addEventListener('keyup', onChange)
    }
    return () => {
      if (!element) return
      element.removeEventListener('mouseup', onChange)
      element.removeEventListener('keyup', onChange)
    }
  }, [id, onChange])
}
