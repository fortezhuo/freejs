import React, { FC } from "react"
import { configRoute as route } from "@free/config"
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ViewProps,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import imgWallpaper from "../../img/wallpaper.jpg"
import { Header } from "../Header"
import { Drawer } from "../Drawer"
import { useLayout } from "./hook"
import { observer } from "mobx-react-lite"

interface Background extends ViewProps {
  wallpaper: boolean
}

const Background: FC<Background> = ({ wallpaper, children }) => {
  return wallpaper ? (
    <ImageBackground source={imgWallpaper} style={styles.rootBackground}>
      {children}
    </ImageBackground>
  ) : (
    <View style={styles.rootBackground}>{children}</View>
  )
}

const AppLayout: FC = observer(({ children }) => {
  useLayout()

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.rootSafe}>
          <View style={styles.rootApp}>
            <Header />
            <Background wallpaper>
              <Drawer>{children}</Drawer>
            </Background>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
})

export default AppLayout

const styles = StyleSheet.create({
  rootSafe: tw(`flex-1`),
  rootApp: tw("flex-1"),
  rootBackground: tw("flex-1 mt-1"),
})
