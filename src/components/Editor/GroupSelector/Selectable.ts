import EgComponent from '@egjs/component'
import styles from './GroupSelector.module.scss'

class Selectable extends EgComponent {
  private canvas: HTMLElement
  private container: HTMLElement
  private ref: HTMLDivElement
  private position: { x: number, y: number }
  private moved: boolean

  constructor (canvas: HTMLElement, container: HTMLElement) {
    super()
    this.canvas = canvas
    this.container = container
    this.position = { x: 0, y: 0 }
    this.moved = false

    this.canvas.addEventListener('mousedown', this.mouseDown)

    this.ref = document.createElement('div')
    this.container.appendChild(this.ref)
    this.ref.className = styles.selector
  }

  private mouseDown = (e: MouseEvent) => {
    this.moved = false
    const { top, left } = this.canvas.getBoundingClientRect()
    this.position = { x: e.pageX - left, y: e.pageY - top }
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  }

  private mouseMove = (e: MouseEvent) => {
    if (e.movementX === 0 && e.movementY === 0) return
    this.moved = true
    const { top, left } = this.canvas.getBoundingClientRect()
    const delta = { x: (e.pageX - left) - this.position.x, y: (e.pageY - top) - this.position.y }
    const width = Math.abs(delta.x)
    const height = Math.abs(delta.y)
    let y = this.position.y
    let x = this.position.x
    if (delta.y < 0) y += delta.y
    if (delta.x < 0) x += delta.x
    this.ref.setAttribute('style',
      `width: ${width}px; height:${height}px; transform: translate(${x}px, ${y}px)`)
    this.trigger('move', { x, y, width, height })
  }

  private mouseUp = () => {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
    if (!this.moved) return
    this.ref.setAttribute('style', 'display:none')
    this.trigger('moveEnd')
  }

  destroy () {
    document.removeEventListener('mousedown', this.mouseDown)
  }
}

export default Selectable
