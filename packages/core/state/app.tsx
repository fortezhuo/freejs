import React from "react"
import * as req from "../request"
import { acl } from "../util"
import { configLDAP as ldap } from "@free/env"
import { useDefaultState, createContext } from "./hook"

const useHook = () => {
  const refAlert = React.useRef(null)
  const app = useDefaultState({})

  React.useEffect(() => {
    if (!app.data.auth?.username) {
      ;(async function () {
        try {
          app.setTemp({
            domain: ldap.map((l: any) => ({
              value: l.domain,
              label: l.domain,
            })),
            isLoading: true,
          })
          const res = await req.GET("/api/auth")
          app.setData({ auth: res.data.result })
        } catch (e) {
          console.log("AUTH FAILED", e)
        } finally {
          app.setTemp({ isLoading: false })
        }
      })()
    }
  }, [app.data.auth?.username])

  const can = React.useCallback(
    (action: string, resource: string) => {
      const roles = app.data.auth?.roles
      if (!roles) return false
      const { granted }: any = acl
        .can(roles)
        .execute(action)
        .sync()
        .on(resource)
      return granted
    },
    [app.data.auth?.username]
  )

  return { ...app, can, refAlert }
}

export const [withApp, useApp] = createContext("App", {}, useHook)
