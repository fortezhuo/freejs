import React from "react"
import { Text, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

interface DisplayError {
  error: any
}

export const DisplayError: React.FC<DisplayError> = ({ error }) => {
  return error && error.message ? (
    <Text style={[s.textError]}>* {error.message}</Text>
  ) : (
    <></>
  )
}

const s = StyleSheet.create({
  textError: tw(`text-xs ${theme.danger_text}`),
})
