import { useEffect } from "react"
import { useStore } from "../Store"
import { useHistory } from "react-router"

export const useHook = () => {
  const history = useHistory()
  const { app } = useStore()

  useEffect(() => {
    app.routerHistory = history
    app.goto()
  }, [])

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
