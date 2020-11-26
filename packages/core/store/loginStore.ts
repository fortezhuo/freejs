import { BaseStore, makeObservable, action } from "./baseStore"
import * as req from "../request"
import { AppStore } from "./appStore"

class LoginStore extends BaseStore {
  title = undefined

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, { login: action })
  }
  login = async () => {
    try {
      this.app?.set("error", undefined)
      this.set("isUpdating", true)
      const [username, password, domain] = this.getData(
        "username",
        "password",
        "domain"
      )
      if (
        (username || "") == "" ||
        (password || "") == "" ||
        (domain || "") == ""
      ) {
        throw new Error("Please fill username, password and domain")
      }

      const res = await req.POST("/api/auth", { username, password, domain })
      this.app?.set("auth", res.data.result)
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isUpdating", false)
    }
  }
}

export { LoginStore }
