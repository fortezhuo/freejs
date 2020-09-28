import React, { FC } from "react"
import { tw } from "@free/tailwind"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Sidebar, useStore } from ".."
import { observer } from "mobx-react-lite"
import { DrawerProps } from "@free/core"

export const Drawer: FC<DrawerProps> = observer(
  ({ testID = "Drawer", children }) => {
    const { app } = useStore()
    return (
      <View style={styles.viewDrawer} testID={testID}>
        {app.auth && (
          <Sidebar
            isOpen={
              !app.isForm && (app.isDrawerOpen || !app.dimension.isMobile)
            }
          />
        )}
        <View style={styles.viewContent}>
          {app.isDrawerOpen && (
            <TouchableWithoutFeedback onPress={app.toggleDrawer}>
              <View style={styles.viewOverlay}></View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.viewChildren}>{children}</View>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  viewDrawer: tw("flex-row flex-1"),
  viewOverlay: tw("flex-1 absolute w-full h-full bg-black-500 z-10"),
  viewContent: tw("flex-1"),
  viewChildren: tw("flex-1"),
})
