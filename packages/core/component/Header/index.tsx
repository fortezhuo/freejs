import React, { FC } from "react"
import { theme } from "../../config/theme"
import { StyleSheet, View } from "react-native"
import { Title } from "../Title"
import { IconButton } from "../Icon"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"

export const Header: FC = observer(() => {
  const { ui } = useStore()
  const subTitle = undefined

  return (
    <View style={styles.rootHeader}>
      <IconButton
        name={ui.isMobile && "menu"}
        style={styles.actionLeft}
        onPress={ui.isMobile && ui.toggleDrawer}
      />
      <Title>{subTitle}</Title>
      <View style={styles.boxGrow}></View>
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
