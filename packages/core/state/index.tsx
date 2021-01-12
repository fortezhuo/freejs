import React from "react"
import * as req from "../request"
import { RBAC } from "@free/rbac"
import { useDefaultState, createContext } from "./hook"
import _isEmpty from "lodash/isEmpty"

export { useState, useDefaultState, createContext } from "./hook"

const acl = new RBAC()

const useHook = () => {
  const refAlert = React.useRef(null)
  const app = useDefaultState({})

  const login = React.useCallback(async (data) => {
    try {
      app.setError({})
      app.setState({ isUpdating: true })
      const res = await req.POST("/api/auth", { ...data })
      const { access, roles = [] } = res.data.result
      acl.load(access)
      acl.register(roles, {})
      app.setData({ auth: res.data.result })
    } catch (err) {
      app.setError(err)
    } finally {
      app.setState({ isUpdating: false })
    }
  }, [])

  const logout = React.useCallback(async () => {
    await req.GET("/api/auth/logout")
    app.setData({ auth: undefined })
  }, [app.data?.auth?.username])

  const can = React.useCallback(
    (action: string, target: string) => {
      const { granted }: any = acl.can(action, target)
      return granted
    },
    [app.data?.auth?.username]
  )

  React.useEffect(() => {
    if (!app.data.auth?.username) {
      ;(async function () {
        try {
          app.setState({
            isLoading: true,
          })
          const res = await req.GET("/api/auth")
          const { access, roles = [] } = res.data.result
          acl.load(access)
          acl.register(roles, {})
          app.setData({ auth: res.data.result })
        } catch (e) {
          console.log("AUTH FAILED", e)
        } finally {
          app.setState({ isLoading: false })
        }
      })()
    }
  }, [app.data.auth?.username])

  return { ...app, can, login, logout, refAlert }
}

export const [withApp, useApp] = createContext("App", {}, useHook)
