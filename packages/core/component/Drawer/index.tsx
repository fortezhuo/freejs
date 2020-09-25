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
      <View style={styles.layoutDrawer} testID={testID}>
        {app.auth && (
          <Sidebar
            isOpen={
              !app.isForm && (app.isDrawerOpen || !app.dimension.isMobile)
            }
          />
        )}
        <View style={styles.panelContent}>
          {app.isDrawerOpen && (
            <TouchableWithoutFeedback onPress={app.toggleDrawer}>
              <View style={styles.panelOverlay}></View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.panelContent}>{children}</View>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  layoutDrawer: tw("flex-row flex-1"),
  panelOverlay: tw("flex-1 absolute w-full h-full bg-black-500 z-10"),
  panelContent: tw("flex-1"),
})
