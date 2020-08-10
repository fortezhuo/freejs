import { useEffect } from "react"
import { useStore } from "../../store"
import { useWindowDimensions } from "react-native"

export const useLayout = () => {
  const { width } = useWindowDimensions()
  const ui = useStore("ui")

  useEffect(() => {
    ui.setMobile(!(width < 1200))
  }, [width])

  return ui
}
