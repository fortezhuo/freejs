import { useEffect } from "react"
import { useTitle } from "./useTitle"

export const useHook = (store: any) => {
  const width = store.app.dimension.width

  useTitle(store)
  useEffect(() => {
    ;(async function () {
      if (store.onLoad) await store.onLoad()
    })()
  }, [])

  useEffect(() => {
    store.set("isLoading", true)
    setTimeout(() => {
      store.set("isLoading", false)
    }, 200)
  }, [width])
}
