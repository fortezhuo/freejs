import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "../Icon"
import { MenuUser } from "./MenuUser"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { HeaderProps } from "@free/core"
import { InputSearch } from "./InputSearch"

export const Header: FC<HeaderProps> = observer(({ testID = "Header" }) => {
  const { app } = useStore()

  return (
    app.auth && (
      <View style={styles.rootHeader} testID={testID}>
        {!app.isForm && app.dimension.isMobile && (
          <IconButton
            name={app.dimension.isMobile && "menu"}
            style={styles.actionLeft}
            onPress={app.dimension.isMobile && app.toggleDrawer}
          />
        )}

        <View style={styles.boxGrow}>
          <InputSearch />
        </View>
        {!app.isForm && <MenuUser />}
      </View>
    )
  )
})

const styles = StyleSheet.create({
  rootHeader: tw(`flex-row h-16 items-center`),
  boxGrow: tw("flex-grow mx-4"),
  actionLeft: tw("ml-4"),
})
