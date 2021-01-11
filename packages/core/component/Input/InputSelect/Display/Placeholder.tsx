import React from "react"
import { Text } from "../../.."
import { StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../../config/theme"

export const Placeholder: React.FC<{
  children: React.ReactNode
  multiple?: boolean
}> = React.memo(({ children }) => {
  return <Text style={[s.textPlaceholder]}>{children}</Text>
})

const s = StyleSheet.create({
  textPlaceholder: tw(`mx-3 ${theme.disabled_text}`),
})
