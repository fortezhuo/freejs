import { AppStore } from "./appStore"
import { UIStore } from "./uiStore"
import { LoginStore } from "./loginStore"
import { ViewStore } from "./viewStore"
import { UserStore } from "./userStore"
import { LogStore } from "./logStore"

export const app = new AppStore()
export const ui = new UIStore(app)
export const login = new LoginStore(app)
export const view = new ViewStore(app)
export const user = new UserStore(app)
export const log = new LogStore(app)
