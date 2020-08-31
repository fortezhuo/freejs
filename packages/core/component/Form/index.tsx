import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"

export const Main: FC = ({ children }) => {
  return (
    <View style={styles.rootMain}>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  rootMain: tw("flex-1 p-1 mt-1 bg-white-700"),
})
