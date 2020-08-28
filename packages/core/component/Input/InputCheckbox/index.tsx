import React, { FC } from "react"
import { IconButton } from "../../Icon"
import { StyleSheet } from "react-native"
import { theme } from "../../../config/theme"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"

const primary = color(theme.primary)

export const InputCheckbox: FC<any> = observer(
  ({ disabled, children, color, checked, onChange, style }) => {
    return (
      <IconButton
        disabled={disabled}
        style={StyleSheet.flatten([styles.rootCheckbox, style])}
        name={checked ? "check-square" : "square"}
        color={color || primary}
        size={20}
        onPress={onChange}
      >
        {children}
      </IconButton>
    )
  }
)

const styles = StyleSheet.create({
  rootCheckbox: { padding: 1, ...tw("h-6") },
})
