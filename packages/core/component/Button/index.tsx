import React, { FC } from "react"
import { IconButton } from "../Icon"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw, border, text, color } from "@free/tailwind"
import { isRGBLight } from "../../util/color"
import { ButtonProps } from "@free/core"

export const Button: FC<ButtonProps> = observer((props) => {
  let {
    store,
    testID = "Button",
    type = "transparent_bg",
    outline,
    children,
    icon,
    style,
    disabled,
    onPress = undefined,
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

  disabled = disabled || store.isUpdating

  return (
    <IconButton
      testID={testID}
      disabled={disabled}
      styleContainer={StyleSheet.flatten([styles.viewButton, bgColor, style])}
      styleText={StyleSheet.flatten([styles.textButton, textColor])}
      style={styles.iconButton}
      name={store.isUpdating ? "loader" : icon}
      color={textColor.color}
      size={18}
      onPress={onPress}
    >
      {children}
    </IconButton>
  )
})

const styles: any = StyleSheet.create({
  viewButton: tw(
    "p-2 flex-row justify-center items-center rounded-full shadow-sm",
    {
      minWidth: 36,
      height: 36,
    }
  ),
  iconButton: tw("ml-2"),
  textButton: tw("mx-2 leading-5"),
})
