import React, { FC } from "react"
import { StyleSheet, View, Text } from "react-native"
import { IconButton } from "../Icon"
import { useMenu } from "../Menu"
import { useStore } from "../Store"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"

export const MenuUser: FC = observer(() => {
  const { show, Menu, MenuItem } = useMenu()
  const { app } = useStore()
  return (
    app.auth && (
      <Menu
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
            <MenuItem name="log-out" onPress={() => app.logout()}>
              Logout
            </MenuItem>
          </View>
        </View>
      </Menu>
    )
  )
})

const styles = StyleSheet.create({
  viewMenu: tw("rounded mt-1 bg-black-100", { padding: 2 }),
  viewUser: tw(`bg-gray-300 p-2 items-center`),
  viewChildren: tw(`bg-white`),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  textUser: tw("text-gray-700 font-bold text-xs"),
})
