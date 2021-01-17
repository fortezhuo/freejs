import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { tw, color } from "@free/tailwind"

export const Loader: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  return (
    <View style={s.viewLoader}>
      <ActivityIndicator
        size="large"
        color={dark ? color("bg-gray-500") : "white"}
      />
    </View>
  )
}

const s = StyleSheet.create({
  viewLoader: tw("justify-center items-center flex-1"),
})
