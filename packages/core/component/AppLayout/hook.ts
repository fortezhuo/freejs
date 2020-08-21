import { useEffect } from "react"
import { useStore } from "../Store"
import { useHistory } from "../Router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"

export const useLayout = () => {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { push } = useHistory()
  const { ui, app } = useStore()

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
        await app.checkAuth()
      } catch (e) {
        console.log(e)
        push("/login")
      }
    })()
  }, [app.logged])

  return ui
}
