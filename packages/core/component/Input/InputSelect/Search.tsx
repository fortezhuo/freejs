import React from "react"
import {
  TextInput,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const Search: React.FC<any> = (props) => {
  const { refSearch, ...rest } = props

  return (
    <TextInput
      ref={refSearch}
      placeholder="Please type here ..."
      style={s.inputText}
      {...rest}
    />
  )
}

const s = StyleSheet.create({
  inputText: tw(
    `w-full ${theme.default_bg} p-2 px-3 ${theme.default_border} border-b`
  ),
})

type Search = {
  refSearch: any
  state: any
  menu: any
}
