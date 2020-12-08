import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { configApp } from "@free/env"
import { Loader, useStore, Gradient, IconButton } from ".."
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native"
import { Platform, Linking, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { getRoute } from "@free/core/config/route"
import { createStackNavigator } from "@react-navigation/stack"
import { DrawerScreen } from "./DrawerScreen"
import { tw } from "@free/tailwind"
import { random } from "../../util"

import { theme } from "../../config/theme"

const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Stack = createStackNavigator()
const NAVIGATION_PERSISTENCE_KEY = `${configApp.name.toUpperCase()}_STATE`

const Routes: React.FC<any> = observer(({ screens }) => {
  const { app } = useStore()
  const [isReady, setIsReady] = React.useState(Platform.OS === "web")
  const [initialState, setInitialState] = React.useState()
  const isMobile = app.dimension.isMobile
  const refNavigation = React.useRef<NavigationContainerRef>(null)

  const routes = React.useMemo(() => {
    let view: any = []
    let child: any = []

    getRoute(app.auth && app).forEach((route: any) => {
      if (!!route.view) {
        view.push({
          path: route.view,
          name: `View${route.alias ? route.alias : route.name}`,
          title: route.title,
          component: "ViewGrid",
        })
      }
      if (!!route.child) {
        child.push({
          path: route.child,
          name: `${route.alias ? route.alias : route.name}`,
          title: route.title,
          component: route.name,
          parent: route.view
            ? `View${route.alias ? route.alias : route.name}`
            : false,
        })
      }
    })

    return { view, child }
  }, [app.auth])

  const linking = React.useMemo(() => {
    const drawer: any = { Index: "index" }
    const child: any = {}
    routes.view.forEach((route: any) => {
      drawer[route.name] = route.path
    })
    routes.child.forEach((route: any) => {
      child[route.name] = route.path
    })

    return {
      prefixes: [`${configApp.name}://`],
      config: {
        initialRouteName: "Index",
        screens: {
          Login: "login",
          Drawer: {
            path: "",
            screens: drawer,
          },
          ...child,
        },
      },
    }
  }, [app.auth])

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()
        if (Platform.OS !== "web" || initialUrl === null) {
          const savedState = await AsyncStorage.getItem(
            NAVIGATION_PERSISTENCE_KEY
          )
          const state = savedState ? JSON.parse(savedState) : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    restoreState()
  }, [])

  return !isReady || app.isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer
      ref={refNavigation}
      linking={linking}
      documentTitle={{
        formatter: (options, route: any) => {
          return `${options?.title ?? route?.name} :: ${configApp.displayName}`
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerBackground: () => (
            <Gradient style={{ flex: 1 }} colors={colors} />
          ),
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "normal",
          },
          cardStyle: {
            overflow: "hidden",
            backgroundColor: "transparent",
            flex: 1,
          },
        }}
      >
        {app.auth ? (
          <>
            <Stack.Screen
              name="Drawer"
              options={{
                headerShown: false,
                headerTransparent: true,
                headerStyle: { backgroundColor: "transparent" },
                cardStyle: {
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  flex: 1,
                },
              }}
            >
              {({ navigation }) => (
                <DrawerScreen
                  routes={routes}
                  navigation={navigation}
                  isMobile={isMobile}
                  screens={screens}
                />
              )}
            </Stack.Screen>

            {routes.child.map((route: any) => {
              return (
                <Stack.Screen
                  options={{
                    title: route.title,
                    headerShown: true,
                    headerLeft: route.parent
                      ? () => {
                          return (
                            <IconButton
                              name={"chevron-left"}
                              style={s.headerLeft}
                              onPress={() => {
                                refNavigation.current?.canGoBack()
                                  ? refNavigation.current?.goBack()
                                  : refNavigation.current?.navigate("Drawer", {
                                      screen: route.parent,
                                    })
                              }}
                            />
                          )
                        }
                      : undefined,
                  }}
                  name={route.name}
                  key={"stack_" + random()}
                  component={screens[route.component]}
                />
              )
            })}
          </>
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={screens.PageLogin}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
})

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
})

export default Routes
