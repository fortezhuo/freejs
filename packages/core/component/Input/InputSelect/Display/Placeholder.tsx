import React from "react"
import { Text } from "../../.."
import { StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../../config/theme"

export const Placeholder: React.FC<{
  children: React.ReactNode
  multiple?: boolean
}> = React.memo(({ children, multiple }) => {
  const style = multiple ? { paddingHorizontal: 8 } : {}
  return <Text style={[s.textPlaceholder, style]}>{children}</Text>
})

const s = StyleSheet.create({
  textPlaceholder: tw(`${theme.disabled_text}`),
})
