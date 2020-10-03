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
      this.isUpdating = true
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

      const res = await req.post("/api/auth", { username, password, domain })
      this.app?.set("auth", res.data.result)
      this.app?.goto("/")
    } catch (err) {
      console.log("auth", err)
      this.app?.set("error", err)
    } finally {
      this.isUpdating = false
    }
  }
}

export { LoginStore }
