import React from "react"
import { DateTimePicker } from "./Raw"
import { InputDateTimeProps } from "@free/core"
import { DisplayError } from "../DisplayError"
import { observer } from "mobx-react-lite"

export const InputDateTime: React.FC<InputDateTimeProps> = observer(
  ({
    store,
    model = "data",
    name,
    onChange,
    type = "date",
    disabled: _disabled,
  }) => {
    const value = store[model].get(name)
    const onChangeDateTime = async (value: any) => {
      store[model].set(name, value)
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
          value={value || new Date()}
          onChange={onChangeDateTime}
        />
        <DisplayError name={name} />
      </>
    )
  }
)
