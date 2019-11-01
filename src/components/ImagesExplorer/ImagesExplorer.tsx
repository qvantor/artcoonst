import React from 'react'
import cn from 'classnames'
import { inject, eC } from '@/store/'
import styles from './ImagesExplorer.module.scss'

const ImagesExplorer = () => {
  const images = [[], [], []]
  const elements = inject((store) => store.elements)

  const addImage = (src: string) => elements.addElement(eC.createImage({ src }))
  return (
    <div className={cn(styles.explorer, 'd-flex')}>
      {images.map((item, i) => {
        const id = Math.floor(Math.random() * 10) + 1
        const url = `/images/${id}.jpg`
        return <div onClick={() => addImage(url)} className={cn(styles.img, 'mr-1')} key={i}>
          <img alt={url} className='img-fluid' src={url} />
        </div>
      })}
    </div>
  )
}

export default ImagesExplorer
