import React from "react"
import { useForm } from "react-hook-form"
import { useApp } from "../../state"
import { useFocusEffect } from "@react-navigation/native"

import { ldap } from "../../config/ldap"

export const useHook = () => {
  const document = useForm({ criteriaMode: "all" })
  const app = useApp()

  useFocusEffect(
    React.useCallback(() => {
      app.setTemp({
        domain: ldap.map((l: any) => ({
          value: l.domain,
          label: l.domain,
        })),
      })
      setTimeout(() => {
        document.setValue("domain", ldap[0].domain)
      }, 100)
    }, [])
  )

  const onSubmit = document.handleSubmit(
    async (data: any) => await app.login(data)
  )

  return { ...document, ...app, onSubmit }
}
