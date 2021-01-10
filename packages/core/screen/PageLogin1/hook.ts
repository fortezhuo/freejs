import React from "react"
import { useForm } from "react-hook-form"
import { useApp } from "../../state"
import { POST } from "../../request"

import { configLDAP as ldap } from "@free/env"

export const useHook = () => {
  const document = useForm({ criteriaMode: "all" })
  const app = useApp()

  React.useEffect(() => {
    document.setValue("domain", ldap[0].domain)
    app.setTemp({
      domain: ldap.map((l: any) => ({
        value: l.domain,
        label: l.domain,
      })),
    })
  }, [])

  const onSubmit = document.handleSubmit(
    React.useCallback(async (data: any) => {
      try {
        const { username, password, domain } = data
        app.setError({})
        app.setState({ isUpdating: true })
        const res = await POST("/api/auth", { username, password, domain })
        app.setData({ auth: res.data.result })
      } catch (err) {
        app.setError(err.data ? err.data : err)
      } finally {
        app.setState({ isUpdating: false })
      }
    }, [])
  )

  return { ...document, ...app, onSubmit }
}
