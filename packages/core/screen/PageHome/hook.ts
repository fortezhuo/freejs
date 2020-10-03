import { useEffect } from "react"
import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  useEffect(() => {
    app.title = undefined
    app.set("isForm", false)
  }, [])
  return app
}
