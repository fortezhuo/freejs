import { useEffect } from "react"
import { useStore } from "../Store"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"
import { useHistory } from "react-router"

/*
function useWindowDimensions(): any {
  const [dimensions, setDimensions] = useState(() => Dimensions.get("window"))
  useEffect(() => {
    function handleChange({ window }: any) {
      if (
        dimensions.width !== window.width ||
        dimensions.height !== window.height ||
        dimensions.scale !== window.scale ||
        dimensions.fontScale !== window.fontScale
      ) {
        setDimensions(window)
      }
    }
    Dimensions.addEventListener("change", handleChange)
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    handleChange({ window: Dimensions.get("window") })
    return () => {
      Dimensions.removeEventListener("change", handleChange)
    }
  }, [dimensions])
  return dimensions
}
*/

export const useHook = () => {
  const history = useHistory()
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
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
