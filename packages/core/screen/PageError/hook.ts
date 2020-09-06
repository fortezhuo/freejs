import { useEffect } from "react"
import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  app.title = "Fatal Error"
  useEffect(() => {
    console.log("masuk use")
    if (!app.fatalError) {
      console.log("masuk sini a")
      app.goto("/")
    }
  }, [app.fatalError])

  return app
}
