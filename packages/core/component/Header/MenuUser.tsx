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
  rootMenuUser: tw("rounded mt-4 bg-black-100", { padding: 2 }),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1 mr-4`),
  boxAuth: tw(`bg-black-200 p-2 items-center`),
  boxMenu: tw(`bg-white`),
  textAuth: tw("text-gray-100 font-bold text-xs"),
})
