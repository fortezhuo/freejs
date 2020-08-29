import { useStore } from "../Store"
import { useEffect } from "react"

export const useHook = (store: any) => {
  const { app } = useStore()
  useEffect(() => {
    app.setTitle(store.title)
    app.showDrawer(store.drawer)
  }, [store.title])
}
