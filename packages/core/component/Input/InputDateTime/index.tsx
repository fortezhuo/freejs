import React from "react"
import { DateTimePicker } from "./Raw"
import { InputDateTimeProps } from "@free/core"
import { DisplayError } from "../DisplayError"

export const InputDateTime: React.FC<InputDateTimeProps> = ({
  store,
  model = "data",
  name,
  onChange,
  type = "date",
  placeholder = "Select Date",
  disabled: _disabled,
  style,
}) => {
  const value = store[model].get(name)

  const setValue = React.useCallback(
    (args: any) => {
      model === "data" ? store.setData(args) : store.setTemp(args)
    },
    [model]
  )

  const onChangeDateTime = async (value: any) => {
    setValue({ [name]: value[0] })
    if (onChange) {
      await onChange()
    }
  }
  const disabled = _disabled || store.isUpdating

  return (
    <>
      <DateTimePicker
        type={type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChangeDateTime}
        style={style}
      />
    </>
  )
}
//      <DisplayError name={name} />
