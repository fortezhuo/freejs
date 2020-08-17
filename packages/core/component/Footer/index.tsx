import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"

export const Footer: FC<Footer> = ({ info = "" }) => {
  return (
    <View style={styles.rootFooter}>
      <Text style={styles.textLeft}>© 2020, Forte Framework</Text>
      <Text style={styles.textRight}>{info}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rootFooter: tw(
    `flex-row flex-no-wrap overflow-hidden justify-between ${theme.primary} inset-x-0 bottom-0 mt-1 px-2 h-6 items-center`
  ),
  textLeft: tw("text-white"),
  textRight: tw("text-white"),
})
