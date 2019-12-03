import React from 'react'
import Select, { Option } from '@/components/Input/Select'
import { textType } from '@/store/types/elements'

interface Props {
  selected: textType
}

const FontSize = ({ selected }: Props) => {
  const [size, setSize] = React.useState(selected.style.fontSize)
  React.useEffect(() => {
    setSize(selected.style.fontSize)
  }, [selected.style.fontSize])
  const sizes = [6, 8, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72]
  const onChange = (val: any) => {
    setSize(val)
    selected.style.setStyle({ fontSize: val })
  }
  return (
    <div style={{ width: 70 }}>
      <Select onChange={onChange} value={size}>
        {sizes.map(item => <Option key={item} value={item}>{item}</Option>)}
      </Select>
    </div>
  )
}

export default FontSize
