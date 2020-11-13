import { useEffect } from "react"

export const useHook = (store: any) => {
  useEffect(() => {
    ;(async function () {
      if (store.onLoad) await store.onLoad()
    })()
  }, [])
}
