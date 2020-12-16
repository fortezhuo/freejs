import React from "react"
import { IconButton, Icon, Text } from "../"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw, border, text, color } from "@free/tailwind"
import { isRGBLight } from "../../util"
import { ButtonProps } from "@free/core"

export const Button: React.FC<ButtonProps> = observer((props) => {
  let {
    store = undefined,
    testID = "Button",
    type = "transparent_bg",
    outline,
    children,
    icon,
    style,
    styleText,
    disabled,
    onPress = undefined,
    onClear = undefined,
  } = props

  const theme_bg = type === "transparent_bg" ? "bg-white" : theme[type]

  const bgColor = tw(
    outline
      ? `border border-solid ${
          isRGBLight(color(theme_bg)) ? "border-gray-700" : border(theme_bg)
        }`
      : theme_bg
  )
  const textColor = tw(
    outline
      ? text(isRGBLight(color(theme_bg)) ? "bg-gray-700" : theme_bg)
      : isRGBLight(color(theme_bg))
      ? "text-gray-700"
      : "text-white"
  )

  disabled = disabled || store?.isUpdating

  return (
    <IconButton
      store={store}
      testID={testID}
      disabled={disabled}
      styleContainer={[s.viewButton, bgColor, style]}
      style={children ? s.iconButton : {}}
      name={store?.isUpdating ? "loader" : icon}
      color={textColor.color}
      size={18}
      onPress={onPress}
    >
      <View style={s.viewGroup}>
        <Text style={[textColor, styleText]}>{children}</Text>
        {onClear && (
          <TouchableOpacity style={s.iconButton} onPress={onClear}>
            <Icon name="x" size={18} />
          </TouchableOpacity>
        )}
      </View>
    </IconButton>
  )
})

const s: any = StyleSheet.create({
  viewButton: tw("p-2 flex-row justify-center items-center rounded-full", {
    minWidth: 36,
    height: 36,
  }),
  viewGroup: tw("pl-1 mr-1 flex-row items-center"),
  iconButton: tw("pl-2"),
})
