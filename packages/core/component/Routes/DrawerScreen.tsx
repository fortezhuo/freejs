import React from "react"
import { IconButton, Sidebar, Header, Gradient } from ".."
import { DrawerActions } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { tw } from "@free/tailwind"
import { random } from "../../util"
import { theme } from "../../config/theme"
const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Drawer = createDrawerNavigator()

export const DrawerScreen: React.FC<any> = ({
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
              <IconButton
                name={"menu"}
                style={s.headerLeft}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
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
    </Gradient>
  )
}

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
  screenContainer: tw("flex-1"),
})
