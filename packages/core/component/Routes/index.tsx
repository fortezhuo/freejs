import React from "react"
import { configApp } from "@free/env"
import { Loader, Gradient, Icon } from ".."
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native"
import {
  Platform,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { getRoute } from "@free/core/config/route"
import { createStackNavigator } from "@react-navigation/stack"
import { DrawerScreen } from "./DrawerScreen"
import { tw } from "@free/tailwind"
import { useApp } from "../../state"
import { random, asyncStorage } from "../../util"
import { theme } from "../../config/theme"

const colors = [theme.primary_1_bg, theme.primary_2_bg]

const Stack = createStackNavigator()

const Routes: React.FC<{ screens: JSONObject }> = ({ screens }) => {
  const app = useApp()
  const [isReady, setIsReady] = React.useState(() => Platform.OS === "web")
  const [initialState, setInitialState] = React.useState()
  const isMobile = app.temp.isMobile
  const refNavigation = React.useRef<NavigationContainerRef>(null)
  const refStorage = React.useRef<JSONObject | undefined>()

  const routes = React.useMemo(() => {
    let view: any = []
    let child: any = []
    const authRoutes = !!app.data?.auth?.username ? getRoute(app) : []
    authRoutes.forEach((route: any) => {
      if (!!route.view) {
        view.push({
          path: route.view,
          key: `route_${random()}`,
          name: `View${route.alias ? route.alias : route.name}`,
          title: route.title,
          component: "ViewGrid",
        })
      }
      if (!!route.child) {
        child.push({
          path: route.child,
          key: `route_${random()}`,
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
  }, [app.data?.auth?.username])

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
          Error: "error",
          "404": "*",
        },
      },
    }
  }, [app.data?.auth?.username])

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()
        if (Platform.OS !== "web" || initialUrl === null) {
          const savedState = await asyncStorage.get()
          refStorage.current = savedState

          if (savedState.hasOwnProperty("navigation")) {
            setInitialState(savedState.navigation)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    restoreState()
  }, [])

  return !isReady || app.stateProps.isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer
      ref={refNavigation}
      linking={linking}
      initialState={initialState}
      onStateChange={(state) =>
        asyncStorage.set(
          JSON.stringify({ ...(refStorage.current || {}), navigation: state })
        )
      }
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
        {app.data?.auth?.username ? (
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
                            <TouchableOpacity
                              onPress={() => {
                                refNavigation.current?.canGoBack()
                                  ? refNavigation.current?.goBack()
                                  : refNavigation.current?.navigate("Drawer", {
                                      screen: route.parent,
                                    })
                              }}
                            >
                              <View style={s.headerLeft}>
                                <Icon name={"chevron-left"} />
                              </View>
                            </TouchableOpacity>
                          )
                        }
                      : undefined,
                  }}
                  name={route.name}
                  key={route.key}
                  component={screens[route.component]}
                />
              )
            })}
            <Stack.Screen name="Error" component={screens.Page500} />
            <Stack.Screen
              options={{ title: "Not Found" }}
              name="404"
              component={screens.Page404}
            />
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
}

const s = StyleSheet.create({
  headerLeft: tw(`ml-4`),
})

export default Routes
