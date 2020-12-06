import React from "react"
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

export const InputText: React.FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  return (
    <>
      <Base
        isLoading={_props.store.isLoading}
        style={[s.viewInput, props.disabled ? s.viewDisabled : {}]}
      >
        <TextInput
          placeholderTextColor={tw("text-gray-600").color}
          style={s.inputText}
          {...props}
        />
      </Base>
      <DisplayError store={_props.store} name={props.name} />
    </>
  )
})

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full h-10`),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})
