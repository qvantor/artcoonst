import React from 'react'
import cn from 'classnames'
import styles from './Layout.module.scss'
import Canvas from '../Canvas/Canvas'
import Sidebar from '../Sidebar/Sidebar'
import Toolbar from '../Toolbar/Toolbar'

const Layout = () => {
  return (
    <div className='container-fluid'>
      <div className={cn('row', styles.header)}>header</div>
      <div className={cn('row', styles.editor)}>
        <div className={cn('col-md-3', styles.sidebar)}>
          <Sidebar />
        </div>
        <div className='col-md-9 p-0'>
          <Toolbar />
          <div className={cn('d-flex align-items-center justify-content-center', styles.canvasContainer)}>
            <Canvas width={700} height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
