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
    type = "default",
    outline,
    children,
    icon,
    style,
    disabled,
    onPress = undefined,
  } = props

  const bgColor = tw(
    outline
      ? `border border-solid ${
          isRGBLight(color(theme[type]))
            ? "border-gray-700"
            : border(theme[type])
        }`
      : theme[type]
  )
  const textColor = tw(
    outline
      ? text(isRGBLight(color(theme[type])) ? "bg-gray-700" : theme[type])
      : isRGBLight(color(theme[type]))
      ? "text-gray-700"
      : "text-white"
  )

  disabled = disabled || store.isUpdating

  return (
    <IconButton
      testID={testID}
      disabled={disabled}
      styleContainer={StyleSheet.flatten([styles.rootButton, bgColor, style])}
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
  rootButton: {
    minWidth: 36,
    height: 36,
    ...tw("p-2 flex-row justify-center rounded"),
  },
  textButton: tw("mx-2 leading-5"),
})
