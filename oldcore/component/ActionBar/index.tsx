import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

export const ActionBar: FC<any> = ({ left, right }) => {
  return (
    <View style={styles.rootActionBar}>
      <View style={StyleSheet.flatten([styles.rootGrow])}>{left}</View>
      <View style={styles.rootGrow}>{right}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootActionBar: tw(
    `${theme.bgActionBar} flex-row overflow-hidden shadow-xl justify-around`
  ),
  rootGrow: tw("flex-grow"),
})
