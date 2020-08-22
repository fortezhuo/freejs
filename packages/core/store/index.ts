import { AppStore } from "./appStore"
import { UIStore } from "./uiStore"
import { LoginStore } from "./loginStore"

const history = null
export const app = new AppStore()
export const ui = new UIStore(app)
export const login = new LoginStore(app)
