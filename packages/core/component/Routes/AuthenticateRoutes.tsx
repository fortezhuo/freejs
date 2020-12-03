import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, Platform, View } from "react-native"
import { Gradient, Header, IconButton, useStore, Sidebar } from ".."
import { theme } from "../../config/theme"
import { random } from "../../util"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Screens: React.FC<any> = ({ navigation, screens, routes, isMobile }) => {
  return (
    <View style={[s.screenContainer]}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "normal",
          },
          headerLeft: (props) => {
            return isMobile ? (
              <IconButton
                name={navigation.canGoBack() ? "chevron-left" : "menu"}
                style={s.headerLeft}
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.toggleDrawer()
                }
              />
            ) : undefined
          },

          headerBackground: () => (
            <Gradient style={{ flex: 1 }} colors={colors} />
          ),
          headerRight: () => <Header.MenuUser />,
        }}
      >
        <Stack.Screen name="Index">
          {(props) => <screens.PageHome {...props} />}
        </Stack.Screen>
        {routes.map((route: any) => {
          const options: any = {
            title: route.title,
          }
          if (route.parent) {
            options["headerLeft"] = () => {
              return (
                <IconButton
                  name={"chevron-left"}
                  style={s.headerLeft}
                  onPress={() =>
                    navigation.canGoBack()
                      ? navigation.goBack()
                      : navigation.navigate(route.parent)
                  }
                />
              )
            }
          }

          return (
            <Stack.Screen
              options={options}
              name={route.name}
              key={"stack_" + random()}
              component={screens[route.component]}
            />
          )
        })}
      </Stack.Navigator>
    </View>
  )
}

export const AuthenticateRoutes = observer(({ screens, routes }: any) => {
  const { app } = useStore()
  const isMobile = app.dimension.isMobile
  const options =
    Platform.OS === "web"
      ? { headerStyle: { height: 0 }, headerTitle: "" }
      : {
          headerShown: false,
        }
  return (
    <Drawer.Navigator
      drawerType={isMobile ? "slide" : "permanent"}
      drawerContent={(props) => {
        return <Sidebar {...props} />
      }}
    >
      <Drawer.Screen name="Screens" options={options}>
        {(props) => (
          <Screens
            {...props}
            isMobile={isMobile}
            routes={routes}
            screens={screens}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
})

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
  screenContainer: tw("flex-1"),
})
