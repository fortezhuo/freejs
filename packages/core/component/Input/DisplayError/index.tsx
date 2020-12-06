import React from "react"
import { Text, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const DisplayError: React.FC<any> = observer(
  ({ store, name, style }) => {
    const errorText = ((store?.error || {}) as any)[name]
    return errorText && <Text style={[s.textError, style]}>* {errorText}</Text>
  }
)

const s = StyleSheet.create({
  textError: tw(`text-xs ${theme.danger_text}`),
})
