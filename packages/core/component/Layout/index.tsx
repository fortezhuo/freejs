import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { LayoutProps } from "@free/core"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { Loader } from "../"

const Wrapper: FC<any> = observer((props) =>
  props.scroll ? (
    <ScrollView
      testID={"LayoutScroll"}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.viewWrapper}
    >
      {props.children}
    </ScrollView>
  ) : (
    <View style={styles.viewWrapper}>{props.children}</View>
  )
)

export const LayoutFull: FC<LayoutProps> = observer(
  ({
    testID = "LayoutFull",
    children,
    store,
    stickyHeader,
    scroll = true,
    isLoading = false,
  }) => {
    useHook(store)
    return (
      <View style={styles.viewLayout}>
        {stickyHeader && <View style={styles.viewHeader}>{stickyHeader}</View>}
        <Wrapper scroll={scroll}>
          <View testID={testID} style={styles.viewLayout}>
            {store.isLoading || isLoading ? <Loader /> : children}
          </View>
        </Wrapper>
      </View>
    )
  }
)

export const Layout: FC<LayoutProps> = observer(
  ({
    testID = "Layout",
    children,
    store,
    isLoading = false,
    stickyHeader,
    scroll,
    style,
  }) => {
    return (
      <LayoutFull
        stickyHeader={stickyHeader}
        store={store}
        scroll={scroll}
        isLoading={isLoading}
      >
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
          {store.isForm && <View style={styles.viewBuffer} />}
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
  viewBuffer: { height: 150 },
})
