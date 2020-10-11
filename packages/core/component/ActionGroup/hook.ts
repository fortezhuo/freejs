import { useCallback } from "react"

export const useEvent = (store: any) => {
  const save = useCallback(async () => {
    if (await store.save()) {
      //store.app.goback()
    }
  }, [])
  const close = useCallback(() => {
    store.app.goback()
  }, [])

  return {
    save,
    close,
  }
}
