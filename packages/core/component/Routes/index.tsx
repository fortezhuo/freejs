import React, { FC } from "react"
import { configApp } from "@free/env"
import { Loader, useStore } from ".."
import { NavigationContainer } from "@react-navigation/native"
import { Platform, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AnonymousRoutes } from "./AnonymousRoutes"
import { AuthenticateRoutes } from "./AuthenticateRoutes"

const NAVIGATION_PERSISTENCE_KEY = `${configApp.name.toUpperCase()}_STATE`

const Routes: FC<{ screens: any }> = observer(({ screens }) => {
  const { app } = useStore()
  const [isReady, setIsReady] = React.useState(Platform.OS === "web")
  const [initialState, setInitialState] = React.useState()

  const config = {
    screens: {
      Screens: "",
      Home: "",
      Login: "login",
      SettingUser: "user",
      ViewUser: "",
      FormUser: "user/:id",
      NotFound: "*",
    },
  }

  const linking = {
    prefixes: [],
    config,
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
    <NavigationContainer>
      {app.auth ? (
        <AuthenticateRoutes screens={screens} />
      ) : (
        <AnonymousRoutes screens={screens} />
      )}
    </NavigationContainer>
  )
})

export default Routes
