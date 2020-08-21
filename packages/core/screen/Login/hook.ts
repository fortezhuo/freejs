import { useEffect } from "react"
import { useHistory } from "../../component/Router"
import { useStore } from "../../component/Store"
import { configLDAP as ldap } from "@free/env"

const ldapDomain = ldap.map((l: { domain?: string }) => l.domain)

export const useLogin = () => {
  const { push } = useHistory()
  const { login: store, app } = useStore()

  useEffect(() => {
    store.data.set("domain", ldapDomain)
  }, [])

  return { store, app }
}
