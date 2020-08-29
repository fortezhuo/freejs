import { observable, action, decorate } from "mobx"
import * as req from "../request"
import { acl } from "../util/acl"

class AppStore {
  _history: any = null
  isUpdating = false
  title = undefined

  can = (action: string, resource: string) => {
    const roles = this?.auth?.roles
    if (!roles) return false
    const { granted }: any = acl.can(roles).execute(action).sync().on(resource)
    return granted
  }

  auth: any = null
  checkAuth = async () => {
    try {
      this.isUpdating = true
      const res = await req.get("/api/auth")
      this.auth = res.data.result
    } finally {
      this.isUpdating = false
    }
  }
  setAuth = (auth: any) => {
    this.auth = auth
  }
  logout = async () => {
    await req.get("/api/auth/logout")
    this.setAuth(undefined)
    this.goto("/login")
  }

  location: string | undefined = undefined
  goto = (path?: string | undefined) => {
    if (path) {
      this?._history.push(path)
    }
    this.location = this?._history?.location.pathname
  }

  subTitle?: string | undefined
  setTitle(title?: string) {
    this.subTitle = title
  }

  isForm?: boolean = false
  setForm(isForm: boolean) {
    this.isForm = isForm
  }

  dimension: ObjectAny = {}
  setDimension = (dimension: ObjectAny) => {
    this.dimension = dimension
  }

  isDrawerOpen = false
  toggleDrawer = () => {
    this.isDrawerOpen = !this.isDrawerOpen
  }
  setDrawerOpen = (isOpen: boolean) => {
    this.isDrawerOpen = isOpen
  }
}

decorate(AppStore, {
  isUpdating: observable,
  can: action,
  auth: observable,
  checkAuth: action,
  setAuth: action,
  logout: action,
  location: observable,
  goto: action,
  subTitle: observable,
  setTitle: action,
  isForm: observable,
  setForm: action,
  dimension: observable,
  setDimension: action,
  isDrawerOpen: observable,
  toggleDrawer: action,
  setDrawerOpen: action,
})

export { AppStore }
