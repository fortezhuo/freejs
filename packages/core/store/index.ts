import { UIStore } from "./uiStore"
import { AppStore } from "./appStore"
import { LoginStore } from "./loginStore"

export const store = {
  ui: new UIStore(),
  app: new AppStore(),
  login: new LoginStore(),
}
