import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { InputTextProps } from "@free/core"
import { theme } from "../../../config/theme"

const helperProps = (props: InputTextProps) => {
  const { store, model = "data", name, disabled, onChange, ...rest } = props
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
    ...rest,
  }
}

export const InputText: FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  return (
    <TextInput
      placeholderTextColor={tw("text-gray-600").color}
      style={StyleSheet.flatten([
        styles.rootInput,
        props.disabled ? styles.inputDisabled : {},
      ])}
      {...props}
    />
  )
})

const styles: any = StyleSheet.create({
  rootInput: tw(
    `${theme.bgInput} ${theme.borderInput} ${theme.textInput} p-2 w-full`
  ),
  inputDisabled: tw(theme.bgDisabled),
})
