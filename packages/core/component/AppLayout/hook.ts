import { useEffect } from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"

export const useLayout = () => {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { ui } = useStore()

  useEffect(() => {
    ui.setDimension({
      isMobile: width < 1200,
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
    })
  }, [width])

  useEffect(() => {
    ;(async function () {
      try {
        await ui.app.checkAuth()
      } catch (e) {
        ui.history.push("/login")
      }
    })()
  }, [ui.app.auth])

  return ui
}
