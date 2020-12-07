import React from "react"
import { IconButton, Sidebar, Header } from ".."
import { DrawerActions } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { tw } from "@free/tailwind"
import { random } from "../../util"

const Drawer = createDrawerNavigator()

export const DrawerScreen: React.FC<any> = ({
  isMobile,
  routes,
  screens,
  navigation,
}) => {
  return (
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
            <IconButton
              name={"menu"}
              style={s.headerLeft}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ) : undefined
        },
        headerRight: () => <Header.MenuUser />,
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
      {routes.view.map((route: any) => {
        return (
          <Drawer.Screen
            key={"drawer_" + random()}
            options={{ title: route.title }}
            name={route.name}
            component={screens[route.component]}
          />
        )
      })}
    </Drawer.Navigator>
  )
}

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
  screenContainer: tw("flex-1"),
})
