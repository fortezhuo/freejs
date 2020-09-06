import { observable, action, decorate } from "mobx"
import * as req from "../request"
import { acl } from "../util/acl"

class AppStore {
  routerHistory: any = null
  title = null

  // observable
  auth: any = null
  dimension: ObjectAny = {}
  error = undefined
  fatalError = undefined
  isDrawerOpen = false
  isForm?: boolean = false
  isUpdating = false
  routerLocation: string | undefined = undefined
  routerParams: any = null
  subTitle?: string | undefined

  can = (action: string, resource: string) => {
    const roles = this?.auth?.roles
    if (!roles) return false
    const { granted }: any = acl.can(roles).execute(action).sync().on(resource)
    return granted
  }
  checkAuth = async () => {
    try {
      this.isUpdating = true
      const res = await req.get("/api/auth")
      this.auth = res.data.result
    } finally {
      this.isUpdating = false
    }
  }
  goto = (path?: string | undefined) => {
    if (path) {
      this?.routerHistory.push(path)
    }
    this.routerLocation = this?.routerHistory?.location.pathname
  }
  logout = async () => {
    await req.get("/api/auth/logout")
    this.auth = undefined
    this.goto("/login")
  }
  set = (name: string, value: any) => {
    ;(this as any)[name] = value
  }
  toggleDrawer = () => {
    this.isDrawerOpen = !this.isDrawerOpen
  }
}

decorate(AppStore, {
  isUpdating: observable,
  set: action,
  can: action,
  auth: observable,
  checkAuth: action,
  logout: action,
  routerLocation: observable,
  routerParams: observable,
  goto: action,
  subTitle: observable,
  isForm: observable,
  dimension: observable,
  isDrawerOpen: observable,
  toggleDrawer: action,
  error: observable,
  fatalError: observable,
})

export { AppStore }
