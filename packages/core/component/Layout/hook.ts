import { useEffect } from "react"
import { useTitle } from "./useTitle"

export const useHook = (store: any) => {
  useTitle(store)
  useEffect(() => {
    if (store.onEdit) {
      store.onEdit()
    }
  }, [])
}
