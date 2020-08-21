import React, { FC, useEffect } from "react"
import { useMenu } from "../../Menu"
import { useSelection } from "./Selection"
import { Anchor } from "./Anchor"
import { Platform } from "react-native"
import { view } from "@risingstack/react-easy-state"

const helperProps = (props) => {
  const {
    state,
    name,
    model = "data",
    multi = false,
    creatable = false,
    placeholder = "Select ...",
    onChange,
    disabled,
    ...rest
  } = props
  const _onChange = async (value) => {
    const parentValue = state[model][name]
    state[model][name] = multi
      ? parentValue.indexOf(value) < 0
        ? parentValue.concat([value])
        : parentValue
      : value
    if (onChange) await onChange()
  }

  const onClear = (value?: string | null) =>
    value ? props.value.filter((p) => p !== value) : (props.value = value)

  return {
    state,
    model,
    name,
    onClear,
    onChange: _onChange,
    placeholder,
    creatable,
    disabled: disabled || state.isUpdating,
    ...rest,
  }
}

export const InputSelect: FC<any> = view((_props) => {
  const props = helperProps(_props)
  const { state, model, name } = props
  const value = state ? (state[model] ? state[model][name] : "") : ""
  const { open, close, onSelfMeasure, Menu } = useMenu()
  const { Selection, onInputFocus } = useSelection()

  useEffect(() => {
    onInputFocus()
  }, [value])

  return (
    <Menu
      extraHeight={Platform.OS == "ios" ? 400 : 300}
      scrollOnFocus={true}
      onShow={onInputFocus}
      anchor={<Anchor parent={props} onLayout={onSelfMeasure} open={open} />}
    >
      <Selection parent={props} onDismiss={close} />
    </Menu>
  )
})
