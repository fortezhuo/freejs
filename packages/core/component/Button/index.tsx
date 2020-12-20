import React from "react"
import { Icon, Text, Base } from "../"
import { StyleSheet, TouchableOpacity, View } from "react-native"
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
  style?: any
  disabled?: boolean
  onPress?: VoidFunction
  onClear?: VoidFunction
}

export const Button: React.FC<Button> = (props) => {
  let {
    testID = "Button",
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
    <TouchableOpacity disabled={disabled || isLoading} onPress={onPress}>
      <Base
        isLoading={isLoading}
        style={[s.viewButton, bgColor, style]}
        testID={testID}
      >
        {icon && (
          <View style={s.iconButton}>
            <Icon
              name={isLoading ? "loader" : icon}
              size={18}
              color={textColor.color}
            />
          </View>
        )}
        <Text style={textColor}>{children}</Text>
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

const s: any = StyleSheet.create({
  viewButton: tw("p-2 flex-row justify-center items-center rounded-full", {
    minWidth: 36,
    height: 36,
  }),
  viewGroup: tw("pl-1 mr-1 flex-row items-center"),
  iconButton: tw("px-1"),
})
