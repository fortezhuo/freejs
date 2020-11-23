import React from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { MenuItemProps } from "@free/core"
import { IconButton } from "../"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

const { color: iconColor } = tw("text-gray-700")
const noop = () => {}

export const MenuItem: React.FC<MenuItemProps> = observer(
  ({
    active,
    name,
    color = iconColor,
    children,
    onPress = noop,
    styleText,
    style,
  }) => {
    return (
      <IconButton
        onPress={() => {
          onPress()
        }}
        styleContainer={[s.viewItem, active ? s.viewItemActive : {}, style]}
        name={name}
        color={color}
        size={18}
        styleText={[s.textItem, styleText]}
      >
        {children}
      </IconButton>
    )
  }
)

const s = StyleSheet.create({
  viewItem: tw(`flex-1 flex-row p-2`),
  viewItemActive: tw("bg-black-100"),
  textItem: tw(`${theme.default_text} leading-5 mx-2`),
})
