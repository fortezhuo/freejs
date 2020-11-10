import React from "react"
import { observer } from "mobx-react-lite"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const AnonymousRoutes = observer(({ screens }: any) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={screens.PageLogin}></Stack.Screen>
    </Stack.Navigator>
  )
})
