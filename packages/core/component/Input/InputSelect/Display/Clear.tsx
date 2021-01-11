import React from "react"
import { Icon } from "../../.."
import { TouchableOpacity } from "react-native"
import { color } from "@free/tailwind"
import { theme } from "../../../../config/theme"

const defaultColor = color(theme.default_text)

export const Clear: React.FC<{ onPress: VoidFunction }> = React.memo(
  ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon color={defaultColor} name="x" size={16} />
      </TouchableOpacity>
    )
  }
)
