import React from "react"
import { DateTimePicker } from "./Raw"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"

interface InputRawDateTime {
  disabled?: boolean
  type?: string
  placeholder?: string
  value: any
  onChange: any
  style?: JSONObject
}

interface FormInputRawDateTime {
  document: any
  name: string
  rules?: any
  style?: JSONObject
  type?: string
  disabled?: boolean
  placeholder?: string
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

export const InputDateTime: React.FC<FormInputRawDateTime> = ({
  document,
  name,
  rules,
  ...props
}) => {
  const {
    field: { onChange, value },
    meta: { invalid },
  } = useController({
    name,
    control: document.control,
    rules,
  })

  return (
    <>
      <InputRawDateTime onChange={onChange} value={value} {...props} />
      {invalid && <DisplayError name={name} error={document.errors} />}
    </>
  )
}
