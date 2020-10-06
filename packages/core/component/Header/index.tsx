import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton, useStore, H3 } from "../"
import { MenuUser } from "./MenuUser"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { HeaderProps } from "@free/core"
import { InputSearch } from "./InputSearch"

export const Header: FC<HeaderProps> = observer(({ testID = "Header" }) => {
  const { app } = useStore()

  return (
    app.auth && (
      <View style={styles.viewHeader} testID={testID}>
        {!app.isForm && app.dimension.isMobile && (
          <IconButton
            name={app.dimension.isMobile && "menu"}
            style={styles.iconLeft}
            onPress={app.dimension.isMobile && app.toggleDrawer}
          />
        )}
        {app.isForm && app.dimension.isMobile && (
          <IconButton
            name={"chevron-left"}
            style={styles.iconLeft}
            onPress={app.goback}
          />
        )}

        <View style={styles.viewGrow}>
          {app.isForm ? (
            <H3 style={styles.textTitle}>{app.subTitle}</H3>
          ) : (
            <InputSearch />
          )}
        </View>
        {!app.isForm && <MenuUser />}
      </View>
    )
  )
})

const styles = StyleSheet.create({
  viewHeader: tw(`flex-row h-16 items-center`),
  viewGrow: tw("flex-grow mx-4"),
  textTitle: tw("text-white"),
  iconLeft: tw("ml-4"),
})
