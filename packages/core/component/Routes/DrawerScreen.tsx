import React from "react"
import { Icon, Sidebar, Gradient } from ".."
import { DrawerActions } from "@react-navigation/native"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import { tw } from "@free/tailwind"
import { random } from "../../util"
import { theme } from "../../config/theme"
import { MenuUser } from "./MenuUser"
const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Drawer = createDrawerNavigator()

interface DrawerScreen {
  isMobile: boolean
  routes: JSONObject
  screens: JSONObject
  navigation: any
}

export const DrawerScreen: React.FC<DrawerScreen> = ({
  isMobile,
  routes,
  screens,
  navigation,
}) => {
  return (
    <Gradient style={{ flex: 1 }} colors={colors}>
      <Drawer.Navigator
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
          },
          headerLeft: () => {
            return isMobile ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <View style={s.headerLeft}>
                  <Icon name="menu" />
                </View>
              </TouchableOpacity>
            ) : undefined
          },
          headerRight: () => <MenuUser />,
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "normal",
          },
          headerShown: true,
        }}
        drawerType={isMobile ? "slide" : "permanent"}
        drawerContent={(props) => {
          return <Sidebar {...props} />
        }}
      >
        <Drawer.Screen name="Index" component={screens.PageHome} />
        {routes.view.map((route: JSONObject) => {
          return (
            <Drawer.Screen
              key={route.key}
              options={{ title: route.title }}
              name={route.name}
              component={screens[route.component]}
            />
          )
        })}
      </Drawer.Navigator>
    </Gradient>
  )
}

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
  screenContainer: tw("flex-1"),
})
