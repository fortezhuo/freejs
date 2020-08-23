import { observable, action, decorate } from "mobx"
import * as req from "../request"
import { acl } from "../util/acl"

class AppStore {
  history: any = null
  auth: any = null
  isUpdating = false
  checkAuth = async () => {
    try {
      this.isUpdating = true
      const res = await req.get("api/auth")
      this.auth = res.data.result
    } finally {
      this.isUpdating = false
    }
  }
  setAuth = (auth: any) => {
    this.auth = auth
  }
  can = (action: string, resource: string) => {
    const roles = this?.auth?.roles
    const { granted }: any = acl.can(roles).execute(action).sync().on(resource)
    return granted
  }
}

decorate(AppStore, {
  auth: observable,
  isUpdating: observable,
  checkAuth: action,
  setAuth: action,
  can: action,
})

export { AppStore }
