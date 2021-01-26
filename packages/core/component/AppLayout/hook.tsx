import React from "react"
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { Keyboard } from "react-native"
import { getScreenSize, asyncStorage } from "../../util"
import { useApp } from "../../state"

export const useAppLayout = () => {
  const insets = useSafeAreaInsets()
  const app = useApp()
  const refKeyboard = React.useRef(0)
  const { width, height } = useSafeAreaFrame()

  React.useEffect(() => {
    const loadKeyboard = async () => {
      const state: any = await asyncStorage.get()
      const { keyboardHeight = 0 } = state
      if (keyboardHeight !== 0) app.setTemp({ keyboardHeight })
    }
    loadKeyboard()
  }, [])

  React.useEffect(() => {
    const screen = getScreenSize(width)
    app.setTemp({
      isMobile: screen !== "xl" && screen !== "lg",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      insets,
      screen,
    })
  }, [width, height])

  const keyboardDidShow = React.useCallback(async (event) => {
    const keyboardHeight = event.endCoordinates.height
    if (keyboardHeight === refKeyboard.current) return

    const state = JSON.parse((await asyncStorage.get()) || "{}")
    refKeyboard.current = keyboardHeight
    app.setTemp({ keyboardHeight: keyboardHeight + 12 })
    asyncStorage.set(
      JSON.stringify({ ...state, keyboardHeight: keyboardHeight + 12 })
    )
  }, [])

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow)
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow)
    }
  }, [])

  return app
}
