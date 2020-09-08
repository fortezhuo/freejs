import { useEffect } from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHistory } from "react-router"
import { useWindowDimensions } from "./useWindowDimensions"

const getScreenSize = (width: number) => {
  if (width >= 1200) return "xl"
  if (width >= 992 && width < 1200) return "lg"
  if (width >= 768 && width < 992) return "md"
  if (width < 768) return "sm"
}

export const useHook = () => {
  const history = useHistory()
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
  const { app } = useStore()

  useEffect(() => {
    app.routerHistory = history
    app.goto()
  }, [])

  useEffect(() => {
    const screen = getScreenSize(width)
    app.set("dimension", {
      isMobile: screen !== "xl",
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
      screen,
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
