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
  style?: any
}

interface FormInputRawDateTime {
  control: any
  name: string
  rules?: any
  style?: any
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
  control,
  name,
  rules,
  ...props
}) => {
  const {
    field: { ref, onChange, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules,
  })

  return (
    <>
      <InputRawDateTime onChange={onChange} value={value} {...props} />
      <DisplayError error={invalid} />
    </>
  )
}
