import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { theme } from "../../config/theme"
import { Gradient, KeyboardAwareScrollView } from "../"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"

const Wrapper: React.FC<any> = observer((props) =>
  props.scroll ? (
    <KeyboardAwareScrollView>{props.children}</KeyboardAwareScrollView>
  ) : (
    <View style={s.viewWrapper}>{props.children}</View>
  )
)

export const LayoutFull: React.FC<LayoutProps> = observer(
  ({ testID = "LayoutFull", children, scroll = true, store }) => {
    useHook(store)
    const colors = [theme.primary_1_bg, theme.primary_2_bg]
    return (
      <Gradient colors={colors} style={s.viewLayout}>
        <Wrapper scroll={scroll}>
          <View testID={testID} style={s.viewLayout}>
            {children}
          </View>
        </Wrapper>
      </Gradient>
    )
  }
)

export const Layout: React.FC<LayoutProps> = observer(
  ({ testID = "Layout", children, scroll, store, style }) => {
    return (
      <LayoutFull scroll={scroll} store={store}>
        <View style={s.viewWrapper1}></View>
        <View style={s.viewWrapper2}>
          <View style={s.viewWrapper21}></View>
          <View style={s.viewWrapper22}></View>
        </View>
        <View style={[s.viewChildren, style]} testID={testID}>
          {children}
          <View testID="Buffer" style={{ height: 150 }} />
        </View>
      </LayoutFull>
    )
  }
)

const s = StyleSheet.create({
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
