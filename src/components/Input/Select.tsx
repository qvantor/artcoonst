import React from 'react'
import cn from 'classnames'
import styles from './Select.module.scss'

interface OptionProps {
  children: any,
  value: string | number
}

export const Option = ({ children }: OptionProps) => children

interface SelectProps<T> {
  children: React.ReactElement[],
  value: T,
  onChange: (value: T) => void
}

const Select = <T, > ({ children, value, onChange }: SelectProps<T>) => {
  const ref = React.useRef(null)
  const list: { props: { value: T } }[] = React.Children.toArray(children)
  const [active, setActive] = React.useState(false)
  const toggleActive = () => setActive(!active)
  // OutsideClick(ref, () => setActive(false))
  const onSelect = (value: T) => (e: React.MouseEvent) => {
    onChange(value)
    toggleActive()
  }
  return (
    <div className={cn(styles.select, { [styles.active]: active })} ref={ref}>
      <div onClick={toggleActive} className={cn('d-flex', styles.value)}>
        {value}
        <i className={cn('fi flaticon-down-chevron ml-auto', styles.caret)} />
      </div>
      <div className={styles.selector}>
        {list.map((item, i) => <div
          className={cn({ [styles.selected]: value === item.props.value })}
          key={i} onClick={onSelect(item.props.value)}>{item}</div>)}
      </div>
    </div>
  )
}

export default Select
