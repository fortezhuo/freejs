import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"
import { StoreProvider } from "../Store"
import { Gradient, Drawer, Header } from "../"
import { useHook } from "./hook"
import { MainLayoutProps } from "@free/core"
import { useDimensions } from "./useDimensions"

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  useDimensions()
  useHook()

  const colors = [theme.primary_1_bg, theme.primary_2_bg]
  return (
    <Gradient colors={colors} style={styles.viewFlexTransparent}>
      {children}
    </Gradient>
  )
}

export const AppLayout: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <MainLayout>
          <SafeAreaView style={styles.viewFlexTransparent}>
            <Drawer>
              <Header />
              {children}
            </Drawer>
          </SafeAreaView>
        </MainLayout>
      </StoreProvider>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  viewFlexTransparent: tw("flex-1 bg-transparent"),
})
