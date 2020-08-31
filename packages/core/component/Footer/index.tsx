import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { FooterProps } from "@free/core"
import { configApp } from "@free/env"
export const Footer: FC<FooterProps> = ({ testID = "Footer" }) => {
  const year = new Date().getFullYear()
  const info = `© ${year}, ${configApp.company}`
  return (
    <View style={styles.rootFooter} testID={testID}>
      <Text style={styles.textLeft}>{info}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rootFooter: tw(
    `flex-row flex-no-wrap overflow-hidden justify-between ${theme.bgFooter} inset-x-0 bottom-0 px-2 h-6 items-center`
  ),
  textLeft: tw("text-white"),
})
