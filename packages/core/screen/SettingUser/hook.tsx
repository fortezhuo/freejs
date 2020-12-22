import React from "react"
import { configACL as acl } from "@free/env"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const user = useDocument("user")
  return user
}
