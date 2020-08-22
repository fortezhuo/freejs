import { observable, action, decorate } from "mobx"
import * as req from "../request"

class AppStore {
  history: any = null
  auth = null
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
}

decorate(AppStore, {
  auth: observable,
  isUpdating: observable,
  checkAuth: action,
  setAuth: action,
})

export { AppStore }
