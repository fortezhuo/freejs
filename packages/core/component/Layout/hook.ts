import React from "react"

export const useHook = (store: any) => {
  React.useEffect(() => {
    ;(async function () {
      if (store.onLoad) await store.onLoad()
    })()
  }, [])
}
