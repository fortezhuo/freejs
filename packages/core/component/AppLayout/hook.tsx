import React from "react"
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { getScreenSize } from "../../util"
import { useApp } from "../../state"

export const useAppLayout = () => {
  const insets = useSafeAreaInsets()
  const app = useApp()
  const { width, height } = useSafeAreaFrame()

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

  return app
}
