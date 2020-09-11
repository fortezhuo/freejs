import { useEffect } from "react"
import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  useEffect(() => {
    app.title = undefined
    app.isForm = false
  }, [])
  return app
}
