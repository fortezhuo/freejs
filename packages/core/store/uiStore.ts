import { observable, action, decorate } from "mobx"
import { AppStore } from "./appStore"

class UIStore {
  history: History | undefined = undefined
  app: AppStore | undefined = undefined

  constructor(app: AppStore, history: History) {
    this.app = app
    this.history = history
  }

  dimension = {}
  setDimension = (dimension: any) => {
    this.dimension = dimension
  }

  isDrawerOpen = false
  toggleDrawer = () => {
    this.isDrawerOpen = !this.isDrawerOpen
  }
  setDrawerOpen = (isOpen: boolean) => {
    this.isDrawerOpen = isOpen
  }
}

decorate(UIStore, {
  dimension: observable,
  setDimension: action,
  isDrawerOpen: observable,
  toggleDrawer: action,
  setDrawerOpen: action,
})

export { UIStore }
