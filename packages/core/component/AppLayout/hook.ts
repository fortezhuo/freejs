import { useEffect } from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"
import { useHistory } from "react-router"

export const useLayout = () => {
  const history = useHistory()
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { ui } = useStore()

  useEffect(() => {
    ui.app.history = history
  }, [])

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
        ui.app.history.push("/login")
      }
    })()
  }, [ui.app.auth])

  return ui
}
