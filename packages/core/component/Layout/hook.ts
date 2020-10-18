import { useEffect } from "react"
import { useTitle } from "./useTitle"

export const useHook = (store: any) => {
  useTitle(store)
  useEffect(() => {
    ;(async function () {
      if (store.onLoad) await store.onLoad()
    })()
  }, [])
}
