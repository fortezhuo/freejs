import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useMenuDropdown, IconButton } from "../"
import { tw } from "@free/tailwind"
import { useApp } from "../../state/app"
import _debounce from "lodash/debounce"

export const MenuUser: React.ReactNode = () => {
  const { show, MenuDropdown, MenuItem } = useMenuDropdown()
  const app = useApp()
  return (
    app.data?.auth?.username && (
      <MenuDropdown
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
            <Text style={s.textUser}>{app.data?.auth?.fullname}</Text>
          </View>
          <View style={s.viewChildren}>
            <MenuItem name="log-out" onPress={_debounce(app.logout, 300)}>
              Logout
            </MenuItem>
          </View>
        </View>
      </MenuDropdown>
    )
  )
}

const s = StyleSheet.create({
  viewMenu: tw("mt-1 rounded-md bg-black-100", { padding: 2 }),
  viewUser: tw(`bg-gray-300 p-2 items-center`),
  viewChildren: tw(`bg-white rounded-b-md`),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  textUser: tw("text-gray-700 font-bold text-xs"),
})
