import { useCallback } from "react"

export const useEvent = (store: any) => {
  const save = useCallback(async () => {
    await store.save()
  }, [])

  return {
    save,
  }
}
