import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { Loader } from "../"

export const LayoutFull: FC<LayoutProps> = observer(
  ({ testID = "LayoutFull", children, store, isLoading = false }) => {
    useHook(store)
    return (
      <View style={styles.viewLayout}>
        <ScrollView
          testID={"LayoutScroll"}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View testID={testID} style={styles.viewLayout}>
            {store.isLoading || isLoading ? <Loader /> : children}
          </View>
        </ScrollView>
      </View>
    )
  }
)

export const Layout: FC<LayoutProps> = observer(
  ({ testID = "Layout", children, store, isLoading = false }) => {
    return (
      <LayoutFull store={store} isLoading={isLoading}>
        <View style={styles.viewWrapper1}></View>
        <View style={styles.viewWrapper2}>
          <View style={styles.viewWrapper21}></View>
          <View style={styles.viewWrapper22}></View>
        </View>
        <View style={styles.viewChildren} testID={testID}>
          {children}
        </View>
      </LayoutFull>
    )
  }
)

const styles = StyleSheet.create({
  viewLayout: tw("flex-1"),
  viewWrapper1: tw("h-20 absolute"),
  viewWrapper2: tw("w-full h-full absolute flex-1"),
  viewWrapper21: tw("h-20 bg-transparent"),
  viewWrapper22: tw("flex-1 bg-gray-200"),
  viewChildren: tw("p-6 pt-0"),
})
