import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { configApp } from "@free/env"
import { Loader, useStore } from ".."
import { linking } from "../../config/linking"
import { NavigationContainer } from "@react-navigation/native"
import { Platform, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { AnonymousRoutes } from "./AnonymousRoutes"
import { AuthenticateRoutes } from "./AuthenticateRoutes"
import _flattenDeep from "lodash/flattenDeep"
import { getRoute } from "@free/core/config/route"

const NAVIGATION_PERSISTENCE_KEY = `${configApp.name.toUpperCase()}_STATE`

const Routes: React.FC<any> = observer(({ screens }) => {
  const { app } = useStore()
  const [isReady, setIsReady] = React.useState(Platform.OS === "web")
  const [initialState, setInitialState] = React.useState()

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

  const routes = React.useMemo(
    () =>
      _flattenDeep(
        getRoute(app.auth && app).map((route: any) => {
          const view = route.view
            ? {
                name: `View${route.alias ? route.alias : route.name}`,
                component: "ViewGrid",
              }
            : []
          const child = route.child
            ? {
                name: `${route.alias ? route.alias : route.name}`,
                component: route.name,
              }
            : []
          return [view, child]
        })
      ),
    [app.auth]
  )

  return !isReady || app.isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer linking={linking}>
      {app.auth ? (
        <AuthenticateRoutes screens={screens} routes={routes} />
      ) : (
        <AnonymousRoutes screens={screens} />
      )}
    </NavigationContainer>
  )
})

export default Routes
