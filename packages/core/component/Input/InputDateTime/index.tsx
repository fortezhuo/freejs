import React from "react"
import { DateTimePicker } from "./Raw"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"

interface InputRawDateTime {
  disabled?: boolean
  type?: string
  placeholder?: string
  editable?: boolean
  value?: any
  onChange?: any
  style?: JSONObject
}

interface InputDateTime extends InputRawDateTime {
  document: any
  name: string
  rules?: any
  isEditable?: boolean
  defaultValue?: any
}

export const InputRawDateTime: React.FC<InputRawDateTime> = ({
  disabled,
  type = "date",
  placeholder = "Select Date",
  value,
  onChange,
  style,
}) => {
  return (
    <DateTimePicker
      type={type}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />
  )
}

export const InputDateTime: React.FC<InputDateTime> = ({
  document,
  name,
  rules,
  isEditable = true,
  editable = true,
  defaultValue = null,
  ...props
}) => {
  const {
    field: { onChange, value },
    meta: { invalid },
  } = useController({
    name,
    control: document.control,
    rules,
    defaultValue,
  })

  return (
    <>
      <InputRawDateTime {...props} onChange={onChange} value={value} />
      {invalid && <DisplayError name={name} error={document.errors} />}
    </>
  )
}
