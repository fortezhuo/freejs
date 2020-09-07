import React, { FC } from "react"
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import imgWallpaper from "../../img/wallpaper.jpg"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import { Header } from "../Header"
import { Drawer } from "../Drawer"
import { Footer } from "../Footer"
import { Snackbar } from "../Snackbar"
import { StoreProvider } from "../Store"
import { useHook } from "./hook"
import { MainLayoutProps } from "@free/core"

const MainLayout: FC<MainLayoutProps> = ({ wallpaper, children }) => {
  useHook()
  return wallpaper ? (
    <ImageBackground source={imgWallpaper} style={styles.rootApp}>
      {children}
    </ImageBackground>
  ) : (
    <View style={styles.rootApp}>{children}</View>
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
              <Header />
              <Drawer>
                {children}
                <Snackbar />
              </Drawer>
              <Footer />
            </MainLayout>
          </SafeAreaView>
        </StoreProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  rootApp: tw("flex-1"),
})
