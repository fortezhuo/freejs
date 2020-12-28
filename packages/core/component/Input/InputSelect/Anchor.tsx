import React from "react"
import { Display } from "./Display"
import { Base } from "../../Base"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const Anchor: React.FC<any> = (props) => {
  const {
    hide,
    show,
    style,
    isLoading,
    disabled,
    isMobile,
    getDisplayProps,
  } = props

  return (
    <TouchableOpacity disabled={disabled} onPress={show}>
      <Base
        isLoading={isLoading}
        style={[s.viewInput, disabled ? s.viewDisabled : {}, style]}
      >
        <Display {...getDisplayProps()} />
      </Base>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row`
  ),
  viewDisabled: tw(theme.disabled_bg),
})

type Anchor = {
  state?: any
  menu?: any
}
