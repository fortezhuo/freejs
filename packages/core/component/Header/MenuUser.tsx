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
            style={s.iconMenuUser}
            name={"user"}
            size={24}
            onPress={show}
          />
        }
      >
        <View style={s.viewMenu}>
          <View style={s.viewUser}>
            <Text style={s.textUser}>{app?.auth?.fullname}</Text>
          </View>
          <View style={s.viewChildren}>
            <MenuItem name="log-out" onPress={_debounce(app.logout, 300)}>
              Logout
            </MenuItem>
          </View>
        </View>
      </Menu>
    )
  )
})

const s = StyleSheet.create({
  viewMenu: tw("mt-1 rounded-md bg-black-100", { padding: 2 }),
  viewUser: tw(`bg-gray-300 p-2 items-center`),
  viewChildren: tw(`bg-white rounded-b-md`),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  textUser: tw("text-gray-700 font-bold text-xs"),
})
