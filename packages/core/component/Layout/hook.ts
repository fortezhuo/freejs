import React from "react"
import { useRoute } from "@react-navigation/native"

export const useHook = (store: any) => {
  const route = useRoute()
  React.useEffect(() => {
    ;(async function () {
      if (store.onLoad) {
        store.set("id", (route?.params as any).id)
        await store.onLoad()
      }
    })()
  }, [])
}
