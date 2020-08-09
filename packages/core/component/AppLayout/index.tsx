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

const noop = () => {}

interface Background extends ViewProps {
  wallpaper: boolean
}

const Background: FC<Background> = ({ wallpaper, children }) => {
  return wallpaper ? (
    <ImageBackground
      style={styles.rootBackground}
      source={require("@free/config/img/wallpaper.jpg")}
    >
      {children}
    </ImageBackground>
  ) : (
    <View style={styles.rootBackground}>{children}</View>
  )
}

const AppLayout: FC<any> = ({ children }) => {
  const { width } = useWindowDimensions()

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.rootSafe}>
          <View style={styles.rootApp}>
            <Background wallpaper>{children}</Background>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  rootSafe: tw(`flex-1 bg-white`),
  rootApp: tw("flex-1"),
  rootBackground: tw("flex-1 mt-1"),
})
