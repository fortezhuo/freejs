import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"

export const Layout: FC<LayoutProps> = ({
  testID = "Layout",
  form,
  children,
  store,
}) => {
  useHook(store)
  return (
    <View
      testID={testID}
      style={StyleSheet.flatten([
        styles.rootLayout,
        form ? styles.rootForm : {},
      ])}
    >
      {children}
    </View>
  )
}

const styles = {
  rootLayout: tw("flex-1"),
  rootForm: tw("bg-white-500 p-1"),
}
