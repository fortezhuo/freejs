import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { theme } from "../../config/theme"
import { Gradient, KeyboardAwareScrollView } from "../"
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
  ({ testID = "LayoutFull", children, scroll = true, store }) => {
    useHook(store)
    const colors = [theme.primary_1_bg, theme.primary_2_bg]
    return (
      <Gradient colors={colors} style={styles.viewLayout}>
        <Wrapper scroll={scroll}>
          <View testID={testID} style={styles.viewLayout}>
            {children}
          </View>
        </Wrapper>
      </Gradient>
    )
  }
)

export const Layout: FC<LayoutProps> = observer(
  ({ testID = "Layout", children, scroll, store, style }) => {
    const isWeb = Platform.OS === "web"
    return (
      <LayoutFull scroll={scroll} store={store}>
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
  viewTransparent: tw("flex-1"),
  viewWrapper: tw("flex-grow"),
  viewWrapper1: tw("h-1 absolute"),
  viewWrapper2: tw("w-full h-full absolute flex-1"),
  viewWrapper21: tw("h-20 bg-transparent"),
  viewWrapper22: tw("flex-1 bg-gray-200"),
  viewHeader: tw("px-6 pb-3"),
  viewChildren: tw("p-6 pt-0"),
})
