import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { InputTextProps } from "@free/core"
import { theme } from "../../../config/theme"
import { DisplayError } from "../DisplayError"

const helperProps = (props: InputTextProps) => {
  const { store, model = "data", name, disabled, onChange, ...rest } = props

  return {
    name,
    value: store[model].get(name) || "",
    onChangeText: async (text: string) => {
      const setValue = (args: any) =>
        model === "data" ? store.setData(args) : store.setTemp(args)
      setValue({ [name]: text })
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
    <Base
      isLoading={_props.store.isLoading}
      style={StyleSheet.flatten([
        styles.viewInput,
        props.disabled ? styles.viewDisabled : {},
      ])}
    >
      <TextInput
        placeholderTextColor={tw("text-gray-600").color}
        style={styles.inputText}
        {...props}
      />
      <DisplayError name={props.name} />
    </Base>
  )
})

const styles: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full h-12`),
  inputText: tw(`${theme.default_text} flex-1 mx-4`),
  viewDisabled: tw(theme.disabled_bg),
})
