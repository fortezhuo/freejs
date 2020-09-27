import React, { FC } from "react"
import { StyleSheet, View, Text } from "react-native"
import { IconButton } from "../Icon"
import { useMenu } from "../Menu"
import { useStore } from "../Store"
import { theme } from "../../config/theme"
import { tw, color, adjust } from "@free/tailwind"
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
        <View style={styles.rootMenuUser}>
          <View style={styles.boxAuth}>
            <Text style={styles.textAuth}>{app?.auth?.fullname}</Text>
          </View>
          <View style={styles.boxMenu}>
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
  rootMenuUser: tw("shadow-md rounded"),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1`),
  boxAuth: tw(`bg-black-200 p-2 items-center mt-4`),
  boxMenu: tw(`bg-white`),
  textAuth: tw("text-gray-100 font-bold text-xs"),
})
