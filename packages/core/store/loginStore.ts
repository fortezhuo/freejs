import { BaseStore, decorate, action } from "./baseStore"
import * as req from "../request"

class LoginStore extends BaseStore {
  title = undefined
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
      this.app?.setAuth(res.data.result)
      this.app?.goto("/")
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.isUpdating = false
    }
  }
}

decorate(LoginStore, {
  login: action,
})

export { LoginStore }
