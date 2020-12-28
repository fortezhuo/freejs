import React from "react"
import FeatherIcon from "react-native-vector-icons/Feather"
import { View, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"

export const Icon: React.FC<{
  name: string
  size?: number
  color?: string
}> = ({ name, size = 24, color = "white" }) => {
  return name ? <FeatherIcon name={name} size={size} color={color} /> : <View />
}

const s = StyleSheet.create({
  viewDisabled: tw(theme.disabled_bg),
  disabled_text: tw(theme.disabled_text),
})
