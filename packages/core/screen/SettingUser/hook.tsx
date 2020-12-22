import React from "react"
import { configACL as acl } from "@free/env"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const user = useDocument("user")

  React.useEffect(() => {
    user.setTemp({
      roles: Object.keys(acl).map((role: any) => ({
        value: role,
        label: role,
      })),
    })
  }, [])

  return user
}
