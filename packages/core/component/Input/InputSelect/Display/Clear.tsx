import React from "react"
import { Icon } from "../../../Icon"
import { TouchableOpacity } from "react-native"
import { color } from "@free/tailwind"
import { theme } from "../../../../config/theme"

const defaultColor = color(theme.default_text)

export const Clear: React.FC<{
  onPress: VoidFunction
  style?: JSONObject
}> = React.memo(({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon color={defaultColor} name="x" size={16} />
    </TouchableOpacity>
  )
})
