import React, { FC } from "react"
import { theme } from "../../config/theme"
import { StyleSheet, View } from "react-native"
import { Title } from "../Title"
import { IconButton } from "../Icon"
import { MenuUser } from "./MenuUser"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { HeaderProps } from "@free/core"

export const Header: FC<HeaderProps> = observer(({ testID = "Header" }) => {
  const { ui } = useStore()

  return (
    <View style={styles.rootHeader} testID={testID}>
      {ui.app.auth && (
        <IconButton
          name={ui.dimension.isMobile && "menu"}
          style={styles.actionLeft}
          onPress={ui.dimension.isMobile && ui.toggleDrawer}
        />
      )}
      <Title>{ui.app.subTitle}</Title>
      <View style={styles.boxGrow}></View>
      <MenuUser />
    </View>
  )
})

const styles = StyleSheet.create({
  rootHeader: tw(
    `flex-row flex-no-wrap h-16 px-4 items-center ${theme.primary} shadow-md z-10`
  ),
  boxGrow: tw("flex-grow"),
  actionLeft: tw("mr-4"),
})
