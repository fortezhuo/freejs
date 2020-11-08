import React from "react"
import { configApp } from "@free/env"
import { View, Linking, Platform, Text, TouchableOpacity } from "react-native"
import { getRoute } from "@free/core/config/route"
import { random } from "@free/core/util/random"
import { observer } from "mobx-react-lite"
import { useStore, Header, Loader } from ".."
import _flattenDeep from "lodash/flattenDeep"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

const NAVIGATION_PERSISTENCE_KEY = `${configApp.name.toUpperCase()}_STATE`

const Routes: React.FC<{ screen: any }> = observer(({ screen }) => {
  const { app } = useStore()
  const routes = getRoute(app.auth && app)
  const Drawer = createDrawerNavigator()
  const Stack = createStackNavigator()

  const [isReady, setIsReady] = React.useState(Platform.OS === "web")
  const [initialState, setInitialState] = React.useState()

  const StackUser = createStackNavigator()
  const SettingUser = () => {
    return (
      <StackUser.Navigator mode="modal" screenOptions={{ headerShown: true }}>
        <StackUser.Screen name="ViewUser" component={screen.ViewGrid} />
        <StackUser.Screen name="FormUser" component={screen.SettingUser} />
      </StackUser.Navigator>
    )
  }

  const MainDrawer = () => {
    return (
      <Drawer.Navigator
        drawerType={Platform.OS === "web" ? "permanent" : "slide"}
        drawerContent={({ navigation }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("User")}>
              <Text>User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
        )}
        initialRouteName={"Home"}
      >
        <Drawer.Screen name="Home" component={screen.PageHome} />
        <Drawer.Screen name="User" component={screen.ViewGrid} />
      </Drawer.Navigator>
    )
  }

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
      linking={{
        prefixes: [],
        config: {
          screens: {
            Drawer: {
              path: "",
              screens: {
                Home: "",
                User: {
                  path: "/user",
                  screens: {
                    ViewUser: "",
                    FormUser: ":id",
                  },
                },
              },
            },
          },
        },
      }}
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator headerMode="none">
        {app.auth ? (
          <Stack.Screen name="Drawer" component={MainDrawer} />
        ) : (
          <Stack.Screen
            name="Login"
            component={screen.PageLogin}
            options={{}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
})

//
//
export default Routes

/*
        {app.auth ? (
          <>
            <Stack.Screen name="Home" component={screen.PageHome} />
            <Stack.Screen name="SettingUser" component={SettingUser} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={screen.PageLogin}
            options={{}}
          />
        )}
*/

/*
      <Route exact path="/" component={screen.PageHome} />
      <Route exact path="/login" component={screen.PageLogin} />
      <Route exact path="/error" component={screen.PageError} />
      {aRoute}
      <Route path="*" component={screen.PageNotFound} />
*/
