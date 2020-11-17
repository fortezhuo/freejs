import React from "react"
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { useStore } from "../Store"
import { getScreenSize } from "./helper"

export const useDimensions = () => {
  const { app } = useStore()
  const insets = useSafeAreaInsets()
  const { width, height } = useSafeAreaFrame()

  React.useEffect(() => {
    const screen = getScreenSize(width)
    app.set("dimension", {
      isMobile: screen !== "xl" && screen !== "lg",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      insets,
      screen,
    })
  }, [width, height])
}
