import { useEffect } from "react"
import { useStore } from "../../component/Store"
import { configLDAP as ldap } from "@free/env"

export const useLogin = () => {
  const { login: store } = useStore()

  useEffect(() => {
    store.data.set("domain", ldap[0].domain)
    store.temp.set(
      "domain",
      ldap.map((l: any) => ({ id: l.domain, label: l.domain }))
    )
  }, [])

  useEffect(() => {
    if (store.app.auth) {
      store.app.goto("/")
    }
  }, [store.app.auth])

  return store
}