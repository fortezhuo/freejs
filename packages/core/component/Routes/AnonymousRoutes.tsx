import React from "react"
import { observer } from "mobx-react-lite"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const AnonymousRoutes = observer(({ screen }: any) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={screen.PageLogin}></Stack.Screen>
    </Stack.Navigator>
  )
})
