import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Display } from "./Display"
import { Base } from "../../Base"

export const Anchor: React.FC<any> = React.memo(
  ({ onPress, disabled, ...props }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Base style={[s.viewInput, disabled ? s.viewDisabled : {}]}>
          <Display {...props} />
        </Base>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row`
  ),
  viewDisabled: tw(theme.disabled_bg),
})
