import React, { FC } from "react"
import { StyleSheet, View, Platform } from "react-native"
import { IconButton, useStore, H3, Gradient } from "../"
import { MenuUser } from "./MenuUser"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { InputSearch } from "./InputSearch"

export const Header: FC<any> = observer(
  ({ previous, navigation, title, ...rest }) => {
    const { app } = useStore()
    const colors = [theme.primary_1_bg, theme.primary_2_bg]
    const isMobileWeb =
      Platform.OS === "web" && app.dimension.isMobile && !app.isDrawerOpen
    const style: any = isMobileWeb ? { position: "fixed" } : {}

    return (
      app.auth && (
        <>
          {isMobileWeb && <View style={{ height: 64 }} />}
          <View testID={"Header"} style={style}>
            <Gradient colors={colors} style={styles.viewHeader}>
              <View style={styles.viewHeader}>
                {!app.isForm && app.dimension.isMobile && (
                  <IconButton
                    name={app.dimension.isMobile && "menu"}
                    style={styles.iconLeft}
                    onPress={app.dimension.isMobile && app.toggleDrawer}
                  />
                )}
                {previous && (
                  <IconButton
                    name={"chevron-left"}
                    style={styles.iconLeft}
                    onPress={() => navigation.goBack()}
                  />
                )}
                <View style={styles.viewGrow}>
                  {app.isForm ? (
                    <H3 style={styles.textTitle}>{title}</H3>
                  ) : (
                    <InputSearch />
                  )}
                </View>

                <MenuUser />
              </View>
            </Gradient>
          </View>
        </>
      )
    )
    /*
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
  */
  }
)

const styles = StyleSheet.create({
  viewHeader: tw(`flex-row h-16 items-center w-full`),
  viewGrow: tw("flex-grow mx-4"),
  textTitle: tw("text-white"),
  iconLeft: tw("ml-4"),
})
