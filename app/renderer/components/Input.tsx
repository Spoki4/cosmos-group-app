import * as React from "react"
import { Input as AntInput } from "antd"
import { InputProps } from "antd/lib/input"
import { injectGlobal } from "styled-components"

interface Props {
  name: string
  value: string
  onChange: (name: string, value: string) => void
  onTouch?: (name: string) => void
  placeholder?: string
  prefix?: string | React.ReactNode
  disabled?: boolean
  size?: "large" | "default" | "small"
}

injectGlobal`
  .ant-input-affix-wrapper .ant-input {
    min-height: auto !important;
  }
`

export class Input extends React.Component<Props> {
  onChange = data => {
    this.props.onChange(this.props.name, data.target.value)
  }

  onTouch = () => {
    this.props.onTouch(this.props.name)
  }

  render() {
    const { prefix, value, placeholder, disabled, size } = this.props

    const props: InputProps = {
      value,
      placeholder,
      disabled,
      onChange: this.onChange,
      onBlur: this.onTouch,
      size: size
    }

    if (prefix) props.prefix = prefix

    return <AntInput {...props} />
  }
}
