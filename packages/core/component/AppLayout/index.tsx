import React from "react"
import { StyleSheet, StatusBar, Platform } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"
import { Gradient } from "../Gradient"
import { Alert } from "../Alert"
import { enableScreens } from "react-native-screens"
import { withApp } from "../../state"
import { useAppLayout, QueryDevtools } from "./hook"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
enableScreens()

const MainLayout: React.FC = withApp(({ children }: any) => {
  const app = useAppLayout()
  const isAdmin = app.can("read", "SETTING")
  const colors = [theme.primary_1_bg, theme.primary_2_bg]

  return (
    <Gradient colors={colors} style={s.viewFlexTransparent}>
      <StatusBar
        barStyle={Platform.OS === "android" ? "dark-content" : "light-content"}
        backgroundColor="transparent"
      />
      {children}
      <Alert ref={app.refAlert} />
      {isAdmin && <QueryDevtools />}
    </Gradient>
  )
})

export const AppLayout: React.FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <MainLayout>{children}</MainLayout>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default AppLayout

const s = StyleSheet.create({
  viewFlexTransparent: tw("flex-1 bg-transparent"),
})
