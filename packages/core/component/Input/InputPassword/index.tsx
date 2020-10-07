import React, { FC } from "react"
import { TextInput, StyleSheet, View, Platform } from "react-native"
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
      styleContainer={styles.eye}
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
    <View
      style={StyleSheet.flatten([
        styles.viewPassword,
        props.disabled ? styles.inputDisabled : {},
        props.isEmpty ? styles.inputError : {},
      ])}
    >
      <TextInput
        secureTextEntry={state.secure}
        placeholderTextColor={tw("text-gray-600").color}
        style={styles.inputPassword}
        {...props}
      />
      <Eye state={state} />
    </View>
  )
})

const styles: any = StyleSheet.create({
  viewPassword: tw(
    `${theme.input_bg} ${theme.input_border} w-full pl-${
      Platform.OS === "android" ? 2 : 3
    } pr-3 flex-row items-center`,
    {
      minHeight: 43,
      maxHeight: 43,
      height: 43,
    }
  ),
  inputPassword: tw(`${theme.input_text} flex-1`),
  inputDisabled: tw(theme.input_disabled_bg),
  inputError: tw(theme.input_error_bg),
  eye: tw("mt-1"),
})
