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
        <View style={styles.triangle} />
        <View style={styles.rootMenuUser}>
          <View style={styles.boxAuth}>
            <Text style={styles.textAuth}>{app?.auth?.fullname}</Text>
          </View>
          <MenuItem name="log-out" onPress={() => app.logout()}>
            Logout
          </MenuItem>
        </View>
      </Menu>
    )
  )
})

const styles = StyleSheet.create({
  rootMenuUser: tw("bg-white shadow-md rounded"),
  iconMenuUser: tw(`rounded-full border-2 border-solid border-white p-1`),
  boxAuth: tw(`${adjust(theme.primary, -1)} p-2 items-center`),
  textAuth: tw("text-gray-100 font-bold text-xs"),
  triangle: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 2,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: color(adjust(theme.primary, -1)),
  },
})
