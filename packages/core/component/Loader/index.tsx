import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { tw, color } from "@free/tailwind"
import { LoaderProps } from "@free/core"

export const Loader: React.FC<LoaderProps> = ({ themeColor }) => {
  return (
    <View style={styles.viewLoader}>
      <ActivityIndicator
        size="large"
        color={themeColor ? color(themeColor) : "white"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewLoader: tw("justify-center items-center flex-1"),
})
