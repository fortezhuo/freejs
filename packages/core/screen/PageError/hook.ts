import { useEffect } from "react"
import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  app.title = "Error"
  useEffect(() => {
    if (!app.fatalError) {
      app.goto("/")
    }
  }, [app.fatalError])

  return app
}
