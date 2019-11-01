import style, { transform } from './style.type'

describe('transform model', () => {
  it('empty params', () => {
    const store = transform.create({
      translate: {}
    })
    expect(store.translate).toEqual({ x: 0, y: 0 })
    expect(store.rotate).toEqual(0)
    expect(store.scale).toEqual([1, 1])
  })
  it('generate css', () => {
    const store = transform.create({
      translate: { x: 10, y: 120 },
      rotate: 90,
      scale: [2, 2]
    })
    expect(store.toCss()).toEqual('translate(10px, 120px) scale(2, 2) rotate(90deg)')
  })
})

describe('style model', () => {
  it('generate css', () => {
    const store = style.create({
      transform: { translate: {} },
      width: 100,
      height: 50
    })
    expect(store.toCss())
      .toEqual('width:100px;height:50px;transform:translate(0px, 0px) scale(1, 1) rotate(0deg);')
  })
})
