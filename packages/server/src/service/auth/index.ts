import { BaseService } from "../base"
import { check } from "./check"
import { login } from "./login"

export class AuthService extends BaseService {
  public check: any
  public login: any
  constructor() {
    super()
    this.check = check.bind(this)
    this.login = login.bind(this)
  }
}
