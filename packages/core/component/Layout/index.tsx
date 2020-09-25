import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { Loader } from "../"

export const Layout: FC<LayoutProps> = observer(
  ({ testID = "Layout", children, store, isLoading = false }) => {
    useHook(store)
    return (
      <View style={styles.rootLayout}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View testID={testID} style={StyleSheet.flatten([styles.rootLayout])}>
            {store.isLoading || isLoading ? <Loader /> : children}
          </View>
        </ScrollView>
      </View>
    )
  }
)

const styles = {
  rootLayout: tw("flex-1"),
}
