import React from "react"
import * as req from "../request"
import { RBAC } from "@free/rbac"
import { useState, createContext } from "./hook"
import _isEmpty from "lodash/isEmpty"

export { useState, createContext } from "./hook"

const useHook = () => {
  const refScroll: any = React.useRef(null)
  const refAlert: any = React.useRef(null)
  const refOffset: any = React.useRef(null)
  const refACL = React.useRef<RBAC>(new RBAC())
  const [data, setData] = useState({})
  const [temp, setTemp] = useState({})
  const [stateProps, setState] = useState({})
  const [error, setError] = useState({})

  const handleError = React.useCallback((err: any) => {
    const { data, status } = err
    const { message, stack } = data || {}

    if (status === 401) {
      setError({ message })
    }

    if (status === 403) {
      refAlert.current.error({
        title: "Attention",
        message,
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => refAlert.current.close(),
          },
        ],
      })
    }

    // Error 500
    if (status === 500) {
      setError({ message, stack })
    }
  }, [])

  const login = React.useCallback(async (data) => {
    try {
      setError({})
      setState({ isUpdating: true })
      const res = await req.POST("/api/auth", { ...data })
      const { access } = res.data.result
      refACL.current.loadAccess(access)
      setData({ auth: res.data.result })
    } catch (err) {
      handleError(err)
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
    refScroll,
    refOffset,
  }
}

export const [withApp, useApp] = createContext("App", {}, useHook)
