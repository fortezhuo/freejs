import { useStore } from "../Store"
import { useEffect } from "react"
import { configApp } from "@free/env"

export const useHook = (store: any) => {
  const { app } = useStore()
  useEffect(() => {
    app.setTitle(store.title)
    document.title = `${store.title} | ${configApp.displayName}`
  }, [])
}
