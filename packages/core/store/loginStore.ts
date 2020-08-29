import { BaseStore, decorate, action } from "./baseStore"
import * as req from "../request"

class LoginStore extends BaseStore {
  title = "Login Page"
  login = async () => {
    try {
      this.isUpdating = true
      const [username, password, domain] = this.getData(
        "username",
        "password",
        "domain"
      )
      const res = await req.post("/api/auth", { username, password, domain })
      this.app?.setAuth(res.data.result)
      this.app?.goto("/")
    } finally {
      this.isUpdating = false
    }
  }
}

decorate(LoginStore, {
  login: action,
})

export { LoginStore }