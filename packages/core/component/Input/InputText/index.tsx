import React from "react"
import { TextInput, StyleSheet } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { DisplayError } from "../DisplayError"

export const InputText: React.FC<any> = (props) => {
  return (
    <>
      <Base style={[s.viewInput, props.disabled ? s.viewDisabled : {}]}>
        <TextInput
          placeholderTextColor={tw("text-gray-600").color}
          style={s.inputText}
          {...props}
        />
      </Base>
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full h-10`),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})
