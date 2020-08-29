import { useStore } from "../Store"
import { useEffect } from "react"
import { configApp } from "@free/env"

export const useHook = (store: any) => {
  const { app } = useStore()
  useEffect(() => {
    app.setTitle(store.title)
    app.showDrawer(store.drawer)
    document.title = `${store.title} | ${configApp.displayName}`
  }, [store.title])
}
