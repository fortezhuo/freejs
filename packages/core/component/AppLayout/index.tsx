import React from "react"
import { StyleSheet, StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"
import { StoreProvider } from "../Store"
import { Gradient, Alert } from "../"
import { MainLayoutProps } from "@free/core"
import { enableScreens } from "react-native-screens"
import { useHook } from "./hook"

enableScreens()

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { refAlert } = useHook()
  const colors = [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <Gradient colors={colors} style={s.viewFlexTransparent}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      {children}
      <Alert ref={refAlert} />
    </Gradient>
  )
}

export const AppLayout: React.FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <MainLayout>{children}</MainLayout>
      </StoreProvider>
    </SafeAreaProvider>
  )
}

export default AppLayout

const s = StyleSheet.create({
  viewFlexTransparent: tw("flex-1 bg-transparent"),
})
