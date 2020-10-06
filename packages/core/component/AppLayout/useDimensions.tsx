import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { useStore } from "../Store"
import { getScreenSize } from "./helper"
import { useEffect } from "react"
import { useKeyboard } from "./useKeyboard"

export const useDimensions = () => {
  const { app } = useStore()
  const insets = useSafeAreaInsets()
  const keyboard = useKeyboard()
  const { width, height } = useSafeAreaFrame()

  useEffect(() => {
    const screen = getScreenSize(width)
    app.set("dimension", {
      isMobile: screen !== "xl" && screen !== "lg",
      keyboard: keyboard,
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      insets,
      screen,
    })
  }, [width, height, keyboard.status])
}
