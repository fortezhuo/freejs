import React from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import { getScreenSize } from "../../util"

export const useDimensions = () => {
  const { app } = useStore()
  const insets = useSafeAreaInsets()

  const updateDimensions = React.useCallback((window: any) => {
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

  const detectTitleChange = React.useCallback(() => {
    const title = document.title
    if (title.indexOf("Login") < 0) {
      const user: any = document.querySelector('div[data-testid="MenuUser"]')
      const sidebar: any = document.querySelector('div[data-testid="Sidebar"]')
        ?.parentNode?.parentNode

      sidebar.style.display = title.indexOf("::") < 0 ? "none" : "flex"
      user.style.display = title.indexOf("::") < 0 ? "none" : "flex"

      setTimeout(() => {
        //        const buffer: any = document.querySelector('div[data-testid="Buffer"]')
        //        buffer.style.display = title.indexOf("::") > 0 ? "none" : "flex"
      }, 500)
    }
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

  React.useEffect(() => {
    window.addEventListener("locationchange", detectTitleChange)
    return () => {
      window.removeEventListener("locationchange", detectTitleChange)
    }
  }, [])
}
