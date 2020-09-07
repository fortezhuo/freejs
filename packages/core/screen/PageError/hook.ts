import { useEffect } from "react"
import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  useEffect(() => {
    if (!app.fatalError) {
      app.goto("/")
    }
  }, [app.fatalError])

  return app
}
