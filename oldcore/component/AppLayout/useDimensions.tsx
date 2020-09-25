import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { useStore } from "../Store"
import { getScreenSize } from "./helper"
import { useEffect } from "react"

export const useDimensions = () => {
  const { app } = useStore()
  const insets = useSafeAreaInsets()
  const { width, height } = useSafeAreaFrame()

  useEffect(() => {
    const screen = getScreenSize(width)
    app.set("dimension", {
      isMobile: screen !== "xl",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      screen,
    })
  }, [width, height])
}
