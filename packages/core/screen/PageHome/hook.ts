import { useStore } from "../../component/Store"

export const useHook = () => {
  const { app } = useStore()
  app.title = undefined
  app.isForm = false
  return app
}
