import React, { FC, useEffect } from "react"
import { configRoute as route } from "@free/config"
import {
  View,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ViewProps,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { tw } from "@free/tailwind"
import imgWallpaper from "../../img/wallpaper.jpg"
import { Sidebar } from "../Sidebar"
import { Drawer } from "../Drawer"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"

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
  const { width } = useWindowDimensions()
  const state = useStore("ui")
  useEffect(() => {
    state.setMobile(!(width < 1200))
  }, [width])

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.rootSafe}>
          <View style={styles.rootApp}>
            <Background wallpaper>
              <Drawer sidebar={<Sidebar />}>{children}</Drawer>
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
