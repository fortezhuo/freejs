import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { KeyboardAwareScrollView } from "../KeyboardAwareScrollView"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"

const Wrapper: FC<any> = observer((props) =>
  props.scroll ? (
    <KeyboardAwareScrollView>{props.children}</KeyboardAwareScrollView>
  ) : (
    <View style={styles.viewWrapper}>{props.children}</View>
  )
)

export const LayoutFull: FC<LayoutProps> = observer(
  ({ testID = "LayoutFull", children, scroll = true, store, stickyHeader }) => {
    useHook(store)

    return (
      <View style={styles.viewLayout} testID={testID}>
        {stickyHeader && <View style={styles.viewHeader}>{stickyHeader}</View>}
        <Wrapper scroll={scroll}>
          <View style={styles.viewLayout}>{children}</View>
        </Wrapper>
      </View>
    )
  }
)

export const Layout: FC<LayoutProps> = observer(
  ({ testID = "Layout", children, scroll, store, stickyHeader, style }) => {
    const isWeb = Platform.OS === "web"
    return (
      <LayoutFull scroll={scroll} stickyHeader={stickyHeader} store={store}>
        <View style={styles.viewWrapper1}></View>
        <View style={styles.viewWrapper2}>
          <View style={styles.viewWrapper21}></View>
          <View style={styles.viewWrapper22}></View>
        </View>
        <View
          style={StyleSheet.flatten([styles.viewChildren, style])}
          testID={testID}
        >
          {children}
          {store.isForm && isWeb && <View style={{ height: 150 }} />}
        </View>
      </LayoutFull>
    )
  }
)

const styles = StyleSheet.create({
  viewLayout: tw("flex-1"),
  viewWrapper: tw("flex-grow"),
  viewWrapper1: tw("h-1 absolute"),
  viewWrapper2: tw("w-full h-full absolute flex-1"),
  viewWrapper21: tw("h-20 bg-transparent"),
  viewWrapper22: tw("flex-1 bg-gray-200"),
  viewHeader: tw("px-6 pb-3"),
  viewChildren: tw("p-6 pt-0"),
})
