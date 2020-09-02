import { useEffect } from "react"
import { useStore } from "../Store"
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from "react-native-safe-area-context"
import { useHistory } from "react-router"

export const useHook = () => {
  const history = useHistory()
  const insets = useSafeAreaInsets()
  const { width, height } = useSafeAreaFrame()
  const { app } = useStore()

  useEffect(() => {
    app._history = history
    app.goto()
  }, [])

  useEffect(() => {
    app.setDimension({
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
        app.goto("/login")
      }
    })()
  }, [app.auth])
}
