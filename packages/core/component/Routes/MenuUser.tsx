import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { MenuDropdown, MenuItem, Icon } from "../"
import { tw } from "@free/tailwind"
import { useApp } from "../../state"
import _debounce from "lodash/debounce"

export const MenuUser: React.FC = () => {
  const app = useApp()
  const ref: any = React.useRef(null)
  return app.data?.auth?.username ? (
    <MenuDropdown
      ref={ref}
      testID="MenuUser"
      anchor={
        <TouchableOpacity onPress={() => ref.current?.open()}>
          <View style={s.iconMenuUser}>
            <Icon name={"user"} size={24} />
          </View>
        </TouchableOpacity>
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
  ) : (
    <></>
  )
}

const s = StyleSheet.create({
  viewMenu: tw("mt-1 rounded-md bg-gray-200", { padding: 2 }),
  viewUser: tw(`bg-gray-200 p-2 items-center`),
  viewChildren: tw(`bg-white rounded-b-md`),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  textUser: tw("text-gray-500 font-bold text-xs"),
})
