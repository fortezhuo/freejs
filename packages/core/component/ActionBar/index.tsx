import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const ActionBar: FC<any> = ({ children }) => {
  return <View style={styles.rootActionBar}>{children}</View>
}

const styles = StyleSheet.create({
  rootActionBar: tw("flex-row p-1 bg-white-500 overflow-hidden"),
})
