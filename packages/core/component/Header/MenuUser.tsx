import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useMenu, useStore, IconButton } from "../"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import _debounce from "lodash/debounce"

export const MenuUser: React.FC = observer(() => {
  const { show, Menu, MenuItem } = useMenu()
  const { app } = useStore()
  return (
    app.auth && (
      <Menu
        testID="MenuUser"
        anchor={
          <IconButton
            style={styles.iconMenuUser}
            name={"user"}
            size={24}
            onPress={show}
          />
        }
      >
        <View style={styles.viewMenu}>
          <View style={styles.viewUser}>
            <Text style={styles.textUser}>{app?.auth?.fullname}</Text>
          </View>
          <View style={styles.viewChildren}>
            <MenuItem name="log-out" onPress={_debounce(app.logout, 300)}>
              Logout
            </MenuItem>
          </View>
        </View>
      </Menu>
    )
  )
})

const styles = StyleSheet.create({
  viewMenu: tw("mt-1 rounded-md bg-black-100", { padding: 2 }),
  viewUser: tw(`bg-gray-300 p-2 items-center`),
  viewChildren: tw(`bg-white rounded-b-md`),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  textUser: tw("text-gray-700 font-bold text-xs"),
})
