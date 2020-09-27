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
      <View style={styles.layout}>
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
          <View testID={testID} style={StyleSheet.flatten([styles.layout])}>
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
        <View style={styles.wrapper1}></View>
        <View style={styles.wrapper2}>
          <View style={styles.wrapper21}></View>
          <View style={styles.wrapper22}></View>
        </View>
        <View style={styles.content} testID={testID}>
          {children}
        </View>
      </LayoutFull>
    )
  }
)

const styles = {
  layout: tw("flex-1"),
  wrapper1: tw("h-20 absolute"),
  wrapper2: tw("w-full h-full absolute flex-1"),
  wrapper21: tw("h-20 bg-transparent"),
  wrapper22: tw("flex-1 bg-gray-200"),
  content: tw("p-6 pt-0"),
}
