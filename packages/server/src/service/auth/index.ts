import { BaseService } from "../base"
import { check } from "./check"
import { login } from "./login"
import { logout } from "./logout"

export class AuthService extends BaseService {
  public check: any
  public login: any
  public logout: any
  constructor() {
    super()
    this.check = check.bind(this)
    this.login = login.bind(this)
    this.logout = logout.bind(this)
  }
}
