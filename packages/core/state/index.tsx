import React from "react"
import * as req from "../request"
import { RBAC } from "@free/rbac"
import { useState, createContext } from "./hook"
import _isEmpty from "lodash/isEmpty"

export { useState, createContext } from "./hook"

const useHook = () => {
  const refAlert = React.useRef(null)
  const refACL = React.useRef<RBAC>(new RBAC())
  const [data, setData] = useState({})
  const [temp, setTemp] = useState({})
  const [stateProps, setState] = useState({})
  const [error, setError] = useState({})

  const login = React.useCallback(async (data) => {
    try {
      setError({})
      setState({ isUpdating: true })
      const res = await req.POST("/api/auth", { ...data })
      const { access } = res.data.result
      refACL.current.loadAccess(access)
      setData({ auth: res.data.result })
    } catch (err) {
      setError(err)
    } finally {
      setState({ isUpdating: false })
    }
  }, [])

  React.useEffect(() => {
    if (!data.auth?.username) {
      ;(async function () {
        try {
          setState({
            isLoading: true,
          })
          const res = await req.GET("/api/auth")
          const { access } = res.data.result
          refACL.current.loadAccess(access)
          setData({ auth: res.data.result })
        } catch (e) {
          console.log("AUTH FAILED", e)
        } finally {
          setState({ isLoading: false })
        }
      })()
    }
  }, [data.auth?.username])

  const logout = React.useCallback(async () => {
    await req.GET("/api/auth/logout")
    setData({ auth: undefined })
  }, [data?.auth?.username])

  const can = React.useCallback(
    (action: string, target: string) => {
      const { granted }: any = refACL.current.can(action, target)
      return granted
    },
    [data?.auth?.username]
  )

  return {
    data,
    temp,
    error,
    stateProps,
    setData,
    setTemp,
    setError,
    setState,
    can,
    login,
    logout,
    refAlert,
  }
}

export const [withApp, useApp] = createContext("App", {}, useHook)
