import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"

export const Layout: FC<LayoutProps> = ({
  testID = "Layout",
  children,
  store,
}) => {
  useHook(store)
  return (
    <View testID={testID} style={styles.rootLayout}>
      {children}
    </View>
  )
}

const styles = {
  rootLayout: tw("flex-1"),
}
