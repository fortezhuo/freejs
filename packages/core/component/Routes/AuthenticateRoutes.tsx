import React from "react"
import Animated from "react-native-reanimated"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, Platform } from "react-native"
import { Gradient, Header, IconButton, useStore, H3, Sidebar } from ".."
import { theme } from "../../config/theme"
import { random } from "../../util/random"

const defaultColor = color(theme.default_text)
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Screens: React.FC<any> = ({
  navigation,
  screens,
  routes,
  isMobile,
  style,
}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.screenContainer, style])}>
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
                style={styles.headerLeft}
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
          if (
            route.component == "ViewGrid" ||
            route.component == "SettingTrash"
          ) {
            options["headerTitle"] = () => <Header.InputSearch />
          }
          if (route.parent) {
            options["headerLeft"] = () => {
              return (
                <IconButton
                  name={"chevron-left"}
                  style={styles.headerLeft}
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
    </Animated.View>
  )
}

export const AuthenticateRoutes = observer(({ screens, routes }: any) => {
  const { app } = useStore()
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })
  const animatedStyle = {
    overflow: (progress as any)._value === 1 ? "hidden" : "scroll",
    transform: [{ scale }],
  }

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
        return <Sidebar {...props} setProgress={setProgress} />
      }}
    >
      <Drawer.Screen name="Screens" options={options}>
        {(props) => (
          <Screens
            {...props}
            isMobile={isMobile}
            routes={routes}
            screens={screens}
            style={isMobile ? animatedStyle : {}}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
})

const styles = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
  screenContainer: tw("flex-1"),
})
