import { observable, action, decorate } from "mobx"
import * as req from "../request"

class AppStore {
  logged = null
  isUpdating = false
  checkAuth = async () => {
    try {
      this.isUpdating = true
      //      const res = await req.get("api/auth")
      //      this.logged = res.data
    } finally {
      this.isUpdating = false
    }
  }
  setLogged = (logged: any) => {
    this.logged = logged
  }
}

decorate(AppStore, {
  logged: observable,
  isUpdating: observable,
  checkAuth: action,
  setLogged: action,
})

export { AppStore }
