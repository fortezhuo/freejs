import { useStore } from "../Store"
import { useEffect } from "react"

export const useTitle = (store: any) => {
  const { app } = useStore()
  useEffect(() => {
    app.setTitle(store.title)
    app.setForm(store.isForm)
  }, [store.title])
}
