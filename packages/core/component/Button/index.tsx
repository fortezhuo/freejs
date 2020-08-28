import React, { FC } from "react"
import { IconButton } from "../Icon"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"

export const Button: FC<any> = observer((props) => {
  const {
    testID = "Button",
    type = "default",
    disabled,
    outline,
    children,
    icon,
    style,
    ...rest
  } = props

  const color = tw(
    outline
      ? `border border-solid ${theme[type].replace("bg", "border")}`
      : theme[type]
  )
  const textColor = tw(
    outline ? theme[type].replace("bg", "text") : "text-white"
  )

  return (
    <IconButton
      testID={testID}
      disabled={disabled}
      styleContainer={StyleSheet.flatten([
        styles.rootButton,
        color,
        style,
        disabled ? styles.rootDisabled : {},
      ])}
      styleText={StyleSheet.flatten([styles.textButton, textColor])}
      style={styles.iconButton}
      name={icon}
      color={textColor.color}
      size={18}
      {...rest}
    >
      {children}
    </IconButton>
  )
})

const styles: any = StyleSheet.create({
  rootButton: {
    minWidth: 100,
    ...tw("p-2 flex-row justify-center rounded"),
  },
  rootDisabled: tw("bg-gray-400"),
  textButton: tw("mx-2 leading-5"),
})
