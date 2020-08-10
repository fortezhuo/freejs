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
import { Button } from "../Button"
import { useDrawer } from "../Drawer"

const noop = () => {}

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

const AppLayout: FC<any> = ({ children }) => {
  const { width } = useWindowDimensions()
  const { Drawer, state } = useDrawer()
  const isMobileScreen = width < 1200

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.rootApp}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.rootSafe}>
          <View style={styles.rootApp}>
            <Background wallpaper>
              <Drawer
                isMobile={isMobileScreen}
                sidebar={
                  <Sidebar toggle={isMobileScreen ? state.toggle : noop} />
                }
              >
                <Button onPress={state.toggle} />
                {children}
              </Drawer>
            </Background>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default AppLayout

const styles = StyleSheet.create({
  rootSafe: tw(`flex-1`),
  rootApp: tw("flex-1"),
  rootBackground: tw("flex-1 mt-1"),
})
