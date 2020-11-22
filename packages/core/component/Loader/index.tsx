import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { LoaderProps } from "@free/core"

export const Loader: React.FC<LoaderProps> = ({ dark = false }) => {
  return (
    <View style={s.viewLoader}>
      <ActivityIndicator
        size="large"
        color={dark ? color(theme.disabled_bg) : "white"}
      />
    </View>
  )
}

const s = StyleSheet.create({
  viewLoader: tw("justify-center items-center flex-1"),
})
