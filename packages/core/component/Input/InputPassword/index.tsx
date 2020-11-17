import React from "react"
import { TextInput, StyleSheet } from "react-native"
import { Base } from "../../Base"
import { DisplayError } from "../DisplayError"
import { tw } from "@free/tailwind"
import { observer, useLocalObservable } from "mobx-react-lite"
import { IconButton } from "../../Icon"
import { InputTextProps } from "@free/core"
import { theme } from "../../../config/theme"

const { color } = tw("text-gray-700")

const helperProps = (props: InputTextProps) => {
  const { store, model = "data", name, disabled, onChange, ...rest } = props

  return {
    name,
    value: store[model].get(name) || "",
    onChangeText: async (text: string) => {
      if (model === "data") {
        store.setData({ [name]: text })
      } else {
        store.setTemp({ [name]: text })
      }
      if (onChange) {
        await onChange()
      }
    },
    disabled: disabled || store.isUpdating,
    ...rest,
  }
}

const Eye: React.FC<any> = observer(({ state }) => {
  return (
    <IconButton
      styleContainer={styles.eye}
      color={color}
      size={16}
      name={state.secure ? "eye" : "eye-off"}
      onPress={state.toggle}
    />
  )
})

export const InputPassword: React.FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  const state = useLocalObservable(() => ({
    secure: true,
    toggle() {
      state.secure = !state.secure
    },
  }))
  return (
    <>
      <Base
        isLoading={_props.store.isLoading}
        style={StyleSheet.flatten([
          styles.viewInput,
          props.disabled ? styles.viewDisabled : {},
        ])}
      >
        <TextInput
          secureTextEntry={state.secure}
          placeholderTextColor={tw("text-gray-600").color}
          style={styles.inputPassword}
          {...props}
        />
        <Eye state={state} />
      </Base>
      <DisplayError name={props.name} />
    </>
  )
})

const styles: any = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row items-center`
  ),
  viewDisabled: tw(theme.disabled_bg),
  inputPassword: tw(`${theme.default_text} flex-1 mx-3`),
  eye: tw("mt-1 mr-3"),
})
