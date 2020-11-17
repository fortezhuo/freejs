import React from "react"
import { useStore } from "../../component/Store"
import { configLDAP as ldap } from "@free/env"

export const useHook = () => {
  const { login } = useStore()
  React.useEffect(() => {
    login.setData({ domain: ldap[0].domain })
    login.setTemp({
      domain: ldap.map((l: any) => ({ value: l.domain, label: l.domain })),
    })
  }, [])

  return login
}
