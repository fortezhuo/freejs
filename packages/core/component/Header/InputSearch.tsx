import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"

export const InputSearch: FC = observer((_props) => {
  return (
    <TextInput
      placeholder="Search ..."
      placeholderTextColor={tw("text-gray-600").color}
      style={StyleSheet.flatten([styles.rootInput])}
    />
  )
})

const styles: any = StyleSheet.create({
  rootInput: tw(
    `${theme.bgInput} ${theme.borderInput} rounded-full ${theme.textInput} p-3 px-6 w-full`
  ),
  inputDisabled: tw(theme.bgDisabled),
  inputError: tw(theme.bgError),
})
