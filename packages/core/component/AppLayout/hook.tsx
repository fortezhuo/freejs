import React from "react"
import { useStore } from "../"
import { useDimensions } from "./useDimensions"

export const useHook = () => {
  useDimensions()
  const { app } = useStore()
  const refAlert = React.useRef(null)

  React.useEffect(() => {
    if (refAlert.current) app.alert = refAlert.current
  }, [refAlert.current])

  React.useEffect(() => {
    ;(async function () {
      try {
        await app.checkAuth()
      } catch (e) {
        console.log("AUTH FAILED", e)
      }
    })()
  }, [app.auth])

  return { refAlert, app }
}
