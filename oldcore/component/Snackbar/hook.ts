import { useStore } from "../Store"

export const useHook = () => {
  const { app } = useStore()
  const hide = () => {
    app.set("error", undefined)
  }
  return {
    error: app.error,
    hide,
  }
}
