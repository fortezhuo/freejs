import { useEffect } from "react"
import { useStore } from "../../component/Store"
import { configACL as acl } from "@free/env"

export const useHook = () => {
  const { user } = useStore()
  useEffect(() => {
    user.temp.set(
      "roles",
      Object.keys(acl).map((role: any) => ({ id: role, label: role }))
    )
  }, [])

  return user
}
