import { history } from "./history"
import { AppStore } from "./appStore"
import { UIStore } from "./uiStore"
import { LoginStore } from "./loginStore"

export const app = new AppStore()
export const ui = new UIStore(app, history)
export const login = new LoginStore(app, history)
