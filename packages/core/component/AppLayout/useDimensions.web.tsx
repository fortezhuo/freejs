import { useCallback } from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import { getScreenSize } from "./helper"
import { useEffect } from "react"

export const useDimensions = () => {
  const { app } = useStore()
  const insets = useSafeAreaInsets()

  const updateDimensions = useCallback((window: any) => {
    const { width, height } = window
    const screen = getScreenSize(width)
    app.set("dimension", {
      isMobile: screen !== "xl" && screen !== "lg",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      screen,
      insets,
    })
  }, [])

  useEffect(() => {
    updateDimensions(Dimensions.get("window"))
    const handleChange = function ({ window }: any) {
      updateDimensions(window)
    }
    Dimensions.addEventListener("change", handleChange)
    return () => {
      Dimensions.removeEventListener("change", handleChange)
    }
  }, [])
}
