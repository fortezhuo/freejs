import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

export const ActionBar: FC<any> = ({ children }) => {
  return <View style={styles.rootActionBar}>{children}</View>
}

const styles = StyleSheet.create({
  rootActionBar: tw(`${theme.bgActionBar} flex-row p-1 overflow-hidden`),
})
