import React, { FC } from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { tw, color } from "@free/tailwind"
import { theme } from "../../config/theme"
import { LoaderProps } from "@free/core"

export const Loader: FC<LoaderProps> = ({ primary }) => {
  return (
    <View style={styles.viewLoader}>
      <ActivityIndicator
        size="large"
        color={primary ? color(theme.primary) : "white"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewLoader: tw("justify-center items-center flex-1"),
})
