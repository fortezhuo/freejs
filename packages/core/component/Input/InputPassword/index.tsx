import React, { FC } from "react"
import { TextInput, StyleSheet, View } from "react-native"
import { tw } from "@free/tailwind"
import { observer, useLocalObservable } from "mobx-react-lite"
import { IconButton } from "../../Icon"
import { InputTextProps } from "@free/core"
import { theme } from "../../../config/theme"

const { color } = tw("text-gray-700")

const helperProps = (props: InputTextProps) => {
  const { store, model = "data", name, disabled, onChange, ...rest } = props
  const isEmpty = (store.temp.get("validateEmpty") || []).indexOf(name) >= 0

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
    isEmpty,
    ...rest,
  }
}

const Eye: FC<any> = observer(({ state }) => {
  return (
    <IconButton
      styleContainer={styles.viewEye}
      color={color}
      size={16}
      name={state.secure ? "eye" : "eye-off"}
      onPress={state.toggle}
    />
  )
})

export const InputPassword: FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  const state = useLocalObservable(() => ({
    secure: true,
    toggle() {
      state.secure = !state.secure
    },
  }))
  return (
    <View>
      <TextInput
        secureTextEntry={state.secure}
        placeholderTextColor={tw("text-gray-600").color}
        style={StyleSheet.flatten([
          styles.inputPassword,
          props.disabled ? styles.inputDisabled : {},
          props.isEmpty ? styles.inputError : {},
        ])}
        {...props}
      />
      <Eye state={state} />
    </View>
  )
})

const styles: any = StyleSheet.create({
  inputPassword: tw(
    `${theme.input_bg} ${theme.input_border} ${theme.input_text} p-3 w-full`
  ),
  viewEye: { right: 12, top: -29, position: "absolute" },
  inputDisabled: tw(theme.input_disabled_bg),
  inputError: tw(theme.input_error_bg),
})
