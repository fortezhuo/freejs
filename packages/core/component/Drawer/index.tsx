import React, { FC } from "react"
import { tw } from "@free/tailwind"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { useSpring, animated } from "react-spring/native"
import { observer, useLocalStore } from "mobx-react-lite"

const { width } = tw("w-64")

export const useDrawer = () => {
  const state = useLocalStore(() => ({
    isOpen: false,
    toggle() {
      state.isOpen = !state.isOpen
    },
  }))

  const Drawer: FC<any> = observer(({ sidebar, children, isMobile }) => {
    const Sidebar: any = isMobile ? animated(View) : View
    const style: any = isMobile
      ? useSpring({
          width: state.isOpen ? width : 0,
        })
      : {}

    return (
      <View style={styles.rootDrawer}>
        {true && (
          <Sidebar style={StyleSheet.flatten([styles.panelSidebar, style])}>
            <ScrollView>{sidebar}</ScrollView>
          </Sidebar>
        )}
        <View style={styles.panelContent}>
          {state.isOpen && (
            <TouchableWithoutFeedback onPress={state.toggle}>
              <View style={styles.panelOverlay}></View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.panelContent}>{children}</View>
        </View>
      </View>
    )
  })

  return {
    Drawer,
    state,
  }
}

const styles = StyleSheet.create({
  rootDrawer: tw("flex-row flex-1"),
  panelSidebar: tw(`shadow-2xl flex-col`),
  panelOverlay: tw("flex-1 absolute w-full h-full bg-black-500 z-10"),
  panelContent: tw("flex-1"),
})
