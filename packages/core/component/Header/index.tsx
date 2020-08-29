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
  const { app } = useStore()

  return (
    <View style={styles.rootHeader} testID={testID}>
      {!app.isForm && app.auth && (
        <IconButton
          name={app.dimension.isMobile && "menu"}
          style={styles.actionLeft}
          onPress={app.dimension.isMobile && app.toggleDrawer}
        />
      )}
      <Title>{app.subTitle}</Title>
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
