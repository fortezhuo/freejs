import React, { FC } from "react"
import { tw } from "@free/tailwind"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { useSpring, animated } from "react-spring/native"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"

const AnimatedView: any = animated(View)

const Sidebar: FC<any> = ({ isOpen, children }) => {
  const style: any = useSpring({
    from: { width: 0 },
    to: {
      width: isOpen ? tw("w-64").width : 0,
    },
  })

  return (
    <AnimatedView style={StyleSheet.flatten([styles.panelSidebar, style])}>
      <ScrollView>{children}</ScrollView>
    </AnimatedView>
  )
}

export const Drawer: FC<any> = observer(({ sidebar, children }) => {
  const state = useStore("ui")

  return (
    <View style={styles.rootDrawer}>
      <Sidebar isOpen={state.isDrawerOpen}>{sidebar}</Sidebar>
      <View style={styles.panelContent}>
        {state.isDrawerOpen && (
          <TouchableWithoutFeedback onPress={state.toggleDrawer}>
            <View style={styles.panelOverlay}></View>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.panelContent}>{children}</View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  rootDrawer: tw("flex-row flex-1"),
  panelSidebar: tw(`shadow-2xl flex-col`),
  panelOverlay: tw("flex-1 absolute w-full h-full bg-black-500 z-10"),
  panelContent: tw("flex-1"),
})
