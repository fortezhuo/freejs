import React from "react"
import { useStore } from "../"
import { useDimensions } from "./useDimensions"

export const useHook = () => {
  useDimensions()
  const { app } = useStore()
  const refMessage = React.useRef(null)

  React.useEffect(() => {
    if (refMessage.current) app.message = refMessage.current
  }, [refMessage.current])

  React.useEffect(() => {
    ;(async function () {
      try {
        await app.checkAuth()
      } catch (e) {
        console.log("AUTH FAILED", e)
      }
    })()
  }, [app.auth])

  return { refMessage, app }
}
