import { AppStore } from "./appStore"
import { UIStore } from "./uiStore"
import { LoginStore } from "./loginStore"
import { ViewStore } from "./viewStore"

export const app = new AppStore()
export const ui = new UIStore(app)
export const login = new LoginStore(app)
export const view = new ViewStore(app)
