import { observable, action, makeObservable } from "mobx"
import * as req from "../request"
import { acl } from "../util"

class AppStore {
  alert: any

  // observable
  auth: any = null
  dimension: ObjectAny = {}
  error = undefined
  fatalError = undefined
  isForm?: boolean = false
  isLoading = false

  constructor() {
    makeObservable(this, {
      auth: observable,
      error: observable,
      fatalError: observable,
      isForm: observable,
      isLoading: observable,
      dimension: observable,
      can: action,
      checkAuth: action,
      logout: action,
      set: action,
      setError: action,
    })
  }

  can = (action: string, resource: string) => {
    const roles = this?.auth?.roles
    if (!roles) return false
    const { granted }: any = acl.can(roles).execute(action).sync().on(resource)
    return granted
  }
  checkAuth = async () => {
    try {
      this.set("isLoading", true)
      const res = await req.GET("/api/auth")
      this.set("auth", res.data.result)
    } finally {
      this.set("isLoading", false)
    }
  }
  logout = async () => {
    await req.GET("/api/auth/logout")
    this.set("auth", undefined)
  }

  set = (name: string, value: any) => {
    ;(this as any)[name] = value
  }
  setError = (err: any) => {
    if (err.status && err.status === 500) {
      this.fatalError = err
    } else {
      const error = err.data ? err.data : err
      if (error.message.indexOf("Validation Error") >= 0) {
        this.error = error.errors
      } else {
        this.error = error
      }
    }
  }
}

export { AppStore }
