import { useEffect } from "react"
import { useStore } from "../../store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"

export const useResponsiveLayout = () => {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const ui = useStore("ui")

  useEffect(() => {
    ui.setDimension({
      isMobile: width < 1200,
      width: width - insets.left - insets.right,
      height: height - insets.top - insets.bottom,
    })
  }, [width])

  return ui
}
