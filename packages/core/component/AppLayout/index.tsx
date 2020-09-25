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
    <Gradient colors={["primary_1", "primary_2"]} style={styles.rootApp}>
      {children}
    </Gradient>
  )
}

export const AppLayout: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StoreProvider>
          <SafeAreaView style={styles.rootApp}>
            <MainLayout>
              <Drawer>
                <Header />
                {children}
              </Drawer>
            </MainLayout>
          </SafeAreaView>
        </StoreProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  rootApp: tw("flex-1 flex-col justify-center bg-white"),
})
