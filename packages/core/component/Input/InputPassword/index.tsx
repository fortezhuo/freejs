import React, { FC } from "react"
import { TextInput, StyleSheet, View } from "react-native"
import { tw } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
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

const Eye: FC<any> = observer(({ state }) => {
  return (
    <IconButton
      styleContainer={styles.rootEye}
      color={color}
      size={16}
      name={state.secure ? "eye" : "eye-off"}
      onPress={state.toggle}
    />
  )
})

export const InputPassword: FC<InputTextProps> = observer((_props) => {
  const props = helperProps(_props)
  const state = useLocalStore(() => ({
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
          styles.rootInput,
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
  rootWrapper: tw("flex-row"),
  rootInput: tw(
    `${theme.bgInput} ${theme.borderInput} ${theme.textInput} p-2 w-full`
  ),
  rootEye: { right: 10, top: -25, position: "absolute" },
  inputDisabled: tw(theme.bgDisabled),
  inputError: tw(theme.bgError),
})
