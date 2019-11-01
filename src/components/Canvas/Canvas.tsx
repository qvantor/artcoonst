import * as React from 'react'
import Editor from '../Editor/Editor'
import InnerCanvas from './InnerCanvas'
import styles from './Canvas.module.scss'

interface IProps {
  width: number,
  height: number
}

type ContextProps = {
  width: number,
  height: number,
  getCanvas: () => HTMLDivElement | null
};
export const CanvasContext = React.createContext<ContextProps>({
  width: 0,
  height: 0,
  getCanvas: () => null
})

const Canvas = ({ width, height }: IProps) => {
  const canvas = React.useRef<HTMLDivElement>(null)
  const getCanvas = () => canvas.current
  return (
    <CanvasContext.Provider value={{ width, height, getCanvas }}>
      <div
        className={styles.canvas}
        style={{ width, height }}
        ref={canvas}>
        <InnerCanvas />
        <Editor />
      </div>
    </CanvasContext.Provider>
  )
}

export default Canvas
