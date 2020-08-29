import { useEffect } from "react"
import { useStore } from "../../component/Store"
import { configLDAP as ldap } from "@free/env"

export const useHook = () => {
  const { login } = useStore()

  useEffect(() => {
    login.data.set("domain", ldap[0].domain)
    login.temp.set(
      "domain",
      ldap.map((l: any) => ({ id: l.domain, label: l.domain }))
    )
  }, [])

  useEffect(() => {
    if (login?.app?.auth) {
      login.app.goto("/")
    }
  }, [login?.app?.auth])

  return login
}
