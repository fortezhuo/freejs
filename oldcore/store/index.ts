import { AppStore } from "./appStore"
import { HomeStore } from "./homeStore"
import { LoginStore } from "./loginStore"
import { ViewStore } from "./viewStore"
import { UserStore } from "./userStore"
import { LogStore } from "./logStore"

export const app = new AppStore()
export const home = new HomeStore(app)
export const login = new LoginStore(app)
export const view = new ViewStore(app)
export const user = new UserStore(app)
export const log = new LogStore(app)
