import { useStore } from "../Store"

export const useHook = () => {
  const { app } = useStore()
  const hide = () => {
    app.setError(undefined)
  }
  return {
    error: app.error,
    hide,
  }
}
