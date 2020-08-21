import { BaseStore, decorate, action } from "./baseStore"
import * as req from "../request"

class LoginStore extends BaseStore {
  login = async () => {
    try {
      this.isUpdating = true
      const [username, password, domain] = this.getData(
        "username",
        "password",
        "domain"
      )
      const res = await req.post("api/auth", { username, password, domain })
      this.app?.setLogged(res.data.result)
      //      this.history?.push("/")
    } finally {
      this.isUpdating = false
    }
  }
}

decorate(LoginStore, {
  login: action,
})

export { LoginStore }
