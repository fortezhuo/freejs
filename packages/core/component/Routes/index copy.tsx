import React, { FC } from "react"
import { View } from "react-native"
import { getRoute } from "@free/core/config/route"
import { random } from "@free/core/util/random"
import { observer } from "mobx-react-lite"
import { useStore, Header } from ".."
import _flattenDeep from "lodash/flattenDeep"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const Routes: FC<{ screen: any }> = observer(({ screen }) => {
  const config = {
    screens: {
      Home: "",
      Login: "login",
      SettingUser: "user",
      ViewUser: "",
      FormUser: "user/:id",
      NotFound: "*",
    },
  }

  const linking = {
    prefixes: ["http://node.rockman.com"],
    config,
  }

  const Stack = createStackNavigator()
  const { app } = useStore()
  const routes = getRoute(app.auth && app)

  const SettingUser = () => {
    const StackUser = createStackNavigator()
    return (
      <StackUser.Navigator mode="modal">
        <StackUser.Screen name="ViewUser" component={screen.ViewGrid} />
        <StackUser.Screen name="FormUser" component={screen.SettingUser} />
      </StackUser.Navigator>
    )
  }

  /*
  const aRoute = _flattenDeep(
    routes.map((route, i) => {
      const routeView = route.view
        ? route.path.map((path: string) => {
            return (
              <Route
                key={"rv_" + random()}
                exact
                path={path}
                component={screen.ViewGrid}
              />
            )
          })
        : []
      const routeComponent = route.view
        ? route.path.map((path: string) => {
            return [
              <Route
                key={"rc_" + random()}
                exact
                path={`${path}/:id`}
                component={screen[route.component]}
              />,
            ].concat(
              route.trash
                ? [
                    <Route
                      key={"rt_" + random()}
                      exact
                      path={`/trash${path}`}
                      component={screen.SettingTrash}
                    />,
                    <Route
                      key={"rtc_" + random()}
                      exact
                      path={`/trash${path}/:id`}
                      component={screen[route.component]}
                    />,
                  ]
                : []
            )
          })
        : route.path.map((path: string) => {
            return (
              <Stack.Screen
                name={route.component}
                key={"rc_" + random()}
                component={screen[route.component]}
              />
            )
          })

      return [routeComponent, routeView]
    })
  )
  */

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        headerMode={app.auth ? "screen" : "none"}
        screenOptions={{
          cardStyle: app.auth ? { backgroundColor: "transparent" } : {},
          headerStyle: app.auth ? { backgroundColor: "transparent" } : {},
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name

            return (
              <Header
                title={title}
                previous={previous}
                navigation={navigation}
              />
            )
          },
        }}
      >
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
