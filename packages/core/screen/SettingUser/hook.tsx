import { useStore } from "../../component/Store"

export const useHook = () => {
  const { user } = useStore()

  return user
}
