import React, { FC } from "react"
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { StoreProvider } from "../Store"
import { Gradient, Drawer, Header } from "../"
import { useHook } from "./hook"
import { MainLayoutProps } from "@free/core"
import { useDimensions } from "./useDimensions"

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  useDimensions()
  useHook()
  return (
    <Gradient
      colors={["primary_1_bg", "primary_2_bg"]}
      style={styles.viewFlexTransparent}
    >
      {children}
    </Gradient>
  )
}

export const AppLayout: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.viewFlexTransparent}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  viewFlexTransparent: tw("flex-1 bg-transparent"),
})
