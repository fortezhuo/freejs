import React from "react"
import { StyleSheet, StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"
import { Gradient, Alert } from "../"
import { enableScreens } from "react-native-screens"
import { withApp } from "../../state/app"
import { useAppLayout } from "./hook"

enableScreens()

const MainLayout: React.FC = withApp(({ children }: any) => {
  const app = useAppLayout()
  const colors = [theme.primary_1_bg, theme.primary_2_bg]

  return (
    <Gradient colors={colors} style={s.viewFlexTransparent}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      {children}
      <Alert ref={app.refAlert} />
    </Gradient>
  )
})

export const AppLayout: React.FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <MainLayout>{children}</MainLayout>
    </SafeAreaProvider>
  )
}

export default AppLayout

const s = StyleSheet.create({
  viewFlexTransparent: tw("flex-1 bg-transparent"),
})
