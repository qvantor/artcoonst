import React from 'react'
import cn from 'classnames'
import styles from './Workspace.module.scss'
import Canvas from '@/components/Canvas/Canvas'

const Workspace = () => {
  return (
    <div className={cn('d-flex align-items-center justify-content-center', styles.workspace)}>
      <Canvas width={700} height={300} />
    </div>
  )
}

export default Workspace
