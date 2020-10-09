import React, { FC } from "react"
import { Text, StyleSheet } from "react-native"
import { useStore } from "../../Store"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const DisplayError: FC<any> = observer(({ name, style }) => {
  const { app } = useStore()
  const errorText = ((app?.error || {}) as any)[name]
  return (
    errorText && (
      <Text style={StyleSheet.flatten([styles.textError, style])}>
        * {errorText}
      </Text>
    )
  )
})

const styles = StyleSheet.create({
  textError: tw(`text-xs ${theme.danger_text}`),
})
