import React from "react"
import { Icon } from "../Icon"
import { Text } from "../Text"
import { Base } from "../Base"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw, border, text, color } from "@free/tailwind"
import { isRGBLight } from "../../util"

const noop = () => {}

interface Button {
  testID?: string
  type?: string
  isLoading?: boolean
  outline?: boolean
  children?: string
  icon?: string
  style?: JSONObject
  disabled?: boolean
  onPress?: VoidFunction
  onClear?: VoidFunction
}

export const Button: React.FC<Button> = (props) => {
  let {
    type = "transparent_bg",
    isLoading,
    outline,
    children,
    icon,
    style,
    disabled,
    onPress = noop,
    onClear = undefined,
  } = props

  const theme_bg = type === "transparent_bg" ? "bg-white" : theme[type]

  const bgColor = tw(
    isLoading || disabled
      ? theme.disabled_bg
      : outline
      ? `border border-solid ${
          isRGBLight(color(theme_bg)) ? "border-gray-700" : border(theme_bg)
        }`
      : theme_bg
  )
  const textColor = tw(
    isLoading || disabled
      ? theme.disabled_text
      : outline
      ? text(isRGBLight(color(theme_bg)) ? "bg-gray-700" : theme_bg)
      : isRGBLight(color(theme_bg))
      ? "text-gray-700"
      : "text-white"
  )

  return (
    <TouchableOpacity disabled={disabled || isLoading} onPressIn={onPress}>
      <Base isLoading={isLoading} style={[s.viewButton, bgColor, style]}>
        {icon && (
          <View style={s.iconButton}>
            <Icon
              name={isLoading ? "loader" : icon}
              size={18}
              color={textColor.color}
            />
          </View>
        )}
        <Text style={[textColor, { alignSelf: "center" }]}>{children}</Text>
        {onClear && (
          <TouchableOpacity
            disabled={disabled || isLoading}
            style={s.iconButton}
            onPress={onClear}
          >
            <Icon name="x" size={18} color={textColor.color} />
          </TouchableOpacity>
        )}
      </Base>
    </TouchableOpacity>
  )
}

interface ButtonIcon {
  icon: string
  size?: number
  onPress?: VoidFunction
  type: string
  style?: JSONObject
}

export const ButtonIcon: React.FC<ButtonIcon> = React.memo(
  ({ icon, size, onPress, type, style }) => {
    return (
      <View style={[s.viewIconButton, tw(theme[type]), style]}>
        <TouchableOpacity onPress={onPress} style={s.touchSmall}>
          <Icon name={icon} size={size || 24} />
        </TouchableOpacity>
      </View>
    )
  }
)

const s: any = StyleSheet.create({
  viewButton: tw(
    "flex-row flex-grow px-2 items-center justify-center rounded-full",
    {
      minWidth: 36,
      height: 36,
    }
  ),
  viewIconButton: tw(`rounded-full h-8 w-8`),
  touchSmall: tw("flex-col items-center justify-center flex-grow w-full"),
  iconButton: tw("px-1"),
})
