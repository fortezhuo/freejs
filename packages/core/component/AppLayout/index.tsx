import React, { FC } from "react"
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import imgWallpaper from "../../img/wallpaper.jpg"
import { Header } from "../Header"
import { Drawer } from "../Drawer"
import { Footer } from "../Footer"
import { StoreProvider } from "../Store"
import { useLayout } from "./hook"
import { observer } from "mobx-react-lite"
import { LayoutProps } from "@free/core"

const Layout: FC<LayoutProps> = ({ wallpaper, children }) => {
  useLayout()
  return wallpaper ? (
    <ImageBackground source={imgWallpaper} style={styles.rootBackground}>
      {children}
    </ImageBackground>
  ) : (
    <View style={styles.rootBackground}>{children}</View>
  )
}

export const AppLayout: FC = observer(({ children }) => {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StoreProvider>
          <SafeAreaView style={styles.rootSafe}>
            <View style={styles.rootApp}>
              <Header />
              <Layout wallpaper>
                <Drawer>{children}</Drawer>
                <Footer />
              </Layout>
            </View>
          </SafeAreaView>
        </StoreProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
})

export default AppLayout

const styles = StyleSheet.create({
  rootSafe: tw(`flex-1`),
  rootApp: tw("flex-1"),
  rootBackground: tw("flex-1"),
})
