import { history } from "./history"
import { AppStore } from "./appStore"
import { UIStore } from "./uiStore"
import { LoginStore } from "./loginStore"

const app = new AppStore()
const ui = new UIStore(app, history)
const login = new LoginStore(app, history)

export { app, ui, login }
