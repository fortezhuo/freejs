import React from "react"
import { Icon as FreeIcon } from "@free/icon"
import { View, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"

export const Icon: React.FC<{
  name: string
  size?: number
  color?: string
  style?: JSONObject
}> = ({ name, size = 24, color = "white", style }) => {
  return name ? (
    <FreeIcon name={name} style={[style, { fontSize: size, color: color }]} />
  ) : (
    <View />
  )
}

const s = StyleSheet.create({
  viewDisabled: tw(theme.disabled_bg),
  disabled_text: tw(theme.disabled_text),
})
