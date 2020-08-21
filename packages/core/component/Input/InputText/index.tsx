import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { InputTextProps } from "@free/core"

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
      style={StyleSheet.flatten([
        styles.rootInput,
        props.disabled ? styles.inputDisabled : {},
      ])}
      {...props}
    />
  )
})

const styles: any = StyleSheet.create({
  rootInput: tw("bg-white border border-gray-300 rounded p-2 w-full"),
  inputDisabled: tw("bg-gray-400"),
})
