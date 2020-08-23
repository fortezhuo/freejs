import { observable, action, decorate } from "mobx"
import * as req from "../request"
import { acl } from "../util/acl"

class AppStore {
  _history: any = null
  isUpdating = false

  can = (action: string, resource: string) => {
    const roles = this?.auth?.roles
    const { granted }: any = acl.can(roles).execute(action).sync().on(resource)
    return granted
  }

  auth: any = null
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

  location: string | undefined = undefined
  goto = (path: string | undefined) => {
    if (path) {
      this?._history.push(path)
    }
    this.location = this?._history?.location.pathname
  }
}

decorate(AppStore, {
  location: observable,
  auth: observable,
  isUpdating: observable,
  checkAuth: action,
  setAuth: action,
  can: action,
  goto: action,
})

export { AppStore }
