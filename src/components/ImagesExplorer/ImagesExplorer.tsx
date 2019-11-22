import React from 'react'
import cn from 'classnames'
import { eC, useStore } from '@/store/'
import styles from './ImagesExplorer.module.scss'

const ImagesExplorer = () => {
  const images = [[], [], []]
  const { elements: { addElement } } = useStore()

  const addImage = (src: string) =>
    addElement(eC.createImage({ src }, { width: 150, height: 100 }))
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
