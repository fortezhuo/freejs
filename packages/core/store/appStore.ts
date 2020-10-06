import { observable, action, makeObservable } from "mobx"
import * as req from "../request"
import { acl } from "../util/acl"

class AppStore {
  routerHistory: any = null
  title: string | undefined = undefined

  // observable
  auth: any = null
  dimension: ObjectAny = {}
  error = undefined
  fatalError = undefined
  isDrawerOpen = false
  isForm?: boolean = false
  isLoading = false
  routerLocation: string | undefined = undefined
  routerParams: any = null
  subTitle?: string | undefined = ""

  constructor() {
    makeObservable(this, {
      auth: observable,
      error: observable,
      fatalError: observable,
      isDrawerOpen: observable,
      isForm: observable,
      isLoading: observable,
      dimension: observable,
      routerLocation: observable,
      routerParams: observable,
      subTitle: observable,
      can: action,
      checkAuth: action,
      goback: action,
      goto: action,
      logout: action,
      set: action,
      setError: action,
      toggleDrawer: action,
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
      const res = await req.get("/api/auth")
      this.set("auth", res.data.result)
    } finally {
      this.set("isLoading", false)
    }
  }
  goback = () => {
    const path = this.routerLocation?.substring(
      0,
      this.routerLocation.lastIndexOf("/")
    )
    this.goto(path)
  }
  goto = (path?: string | undefined) => {
    if (path) {
      this?.routerHistory.push(path)
    }
    this.routerLocation = this?.routerHistory?.location.pathname
  }
  logout = async () => {
    await req.get("/api/auth/logout")
    this.set("auth", undefined)
    this.goto("/login")
  }

  set = (name: string, value: any) => {
    ;(this as any)[name] = value
  }
  setError = (err: any) => {
    if (err.status && err.status === 500) {
      this.fatalError = err
      this.goto("/error")
    } else {
      this.error = err
    }
  }
  toggleDrawer = () => {
    this.isDrawerOpen = !this.isDrawerOpen
  }
}

export { AppStore }
