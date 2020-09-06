import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { Loader } from "../Loader"
import { observer } from "mobx-react-lite"

export const Layout: FC<LayoutProps> = observer(
  ({ testID = "Layout", form, children, store }) => {
    useHook(store)

    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([
          styles.rootLayout,
          form ? styles.rootForm : {},
        ])}
      >
        {store.isLoading ? <Loader /> : children}
      </View>
    )
  }
)

const styles = {
  rootLayout: tw("flex-1"),
  rootForm: tw("bg-white-500 p-1"),
}
