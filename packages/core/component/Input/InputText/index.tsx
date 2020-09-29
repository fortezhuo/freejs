import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { InputTextProps } from "@free/core"
import { theme } from "../../../config/theme"

const helperProps = (props: InputTextProps) => {
  const { store, model = "data", name, disabled, onChange, ...rest } = props
  const isEmpty = (store.temp.get("validateEmpty") || []).indexOf(name) >= 0

  return {
    name,
    value: store[model].get(name) || "",
    onChangeText: async (text: string) => {
      store[model].set(name, text)
      if (onChange) {
        await onChange()
      }
    },
    disabled: disabled || store.isUpdating,
    isEmpty,
    ...rest,
  }
}

export const InputText: FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  return (
    <TextInput
      placeholderTextColor={tw("text-gray-600").color}
      style={StyleSheet.flatten([
        styles.inputText,
        props.disabled ? styles.inputDisabled : {},
        props.isEmpty ? styles.inputError : {},
      ])}
      {...props}
    />
  )
})

const styles: any = StyleSheet.create({
  inputText: tw(
    `${theme.input_bg} ${theme.input_border} ${theme.input_text} p-3 w-full`
  ),
  inputDisabled: tw(theme.input_disabled_bg),
  inputError: tw(theme.input_error_bg),
})
