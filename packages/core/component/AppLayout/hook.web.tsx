import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ReactQueryDevtools } from "react-query/devtools"
import { Dimensions } from "react-native"
import { getScreenSize } from "../../util"
import { useApp } from "../../state"

export const QueryDevtools = ReactQueryDevtools

export const useAppLayout = () => {
  const app = useApp()
  const insets = useSafeAreaInsets()
  const updateDimensions = React.useCallback((window: any) => {
    const { width, height } = window
    const screen = getScreenSize(width)
    app.setTemp({
      isMobile: screen !== "xl" && screen !== "lg",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      keyboardHeight: 0,
      screen,
      insets,
    })
  }, [])

  React.useEffect(() => {
    updateDimensions(Dimensions.get("window"))
    const handleChange = function ({ window }: any) {
      updateDimensions(window)
    }
    Dimensions.addEventListener("change", handleChange)
    return () => {
      Dimensions.removeEventListener("change", handleChange)
    }
  }, [])

  return app
}
