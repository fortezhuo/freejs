import React, { FC } from "react"
import { tw } from "@free/tailwind"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Sidebar } from "../Sidebar"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"

export const Drawer: FC = observer(({ children }) => {
  const state = useStore("ui")

  return (
    <View style={styles.rootDrawer}>
      <Sidebar isOpen={state.isDrawerOpen || !state.isMobile} />
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
