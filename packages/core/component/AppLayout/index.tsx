import React from "react"
import { StyleSheet, StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"
import { StoreProvider } from "../Store"
import { Gradient, useStore, Message } from "../"
import { MainLayoutProps } from "@free/core"
import { enableScreens } from "react-native-screens"
import { useDimensions } from "./useDimensions"

enableScreens()

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { app } = useStore()
  app.message = React.useRef(null)
  useDimensions()
  React.useEffect(() => {
    ;(async function () {
      try {
        await app.checkAuth()
      } catch (e) {
        console.log("AUTH FAILED", e)
      }
    })()
  }, [app.auth])

  const colors = [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <Gradient colors={colors} style={s.viewFlexTransparent}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      {children}
      <Message ref={app.message} />
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
