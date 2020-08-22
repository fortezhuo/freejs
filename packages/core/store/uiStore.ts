import { observable, action, decorate } from "mobx"
import { AppStore } from "./appStore"

class UIStore {
  app: AppStore | undefined = undefined

  constructor(app: AppStore) {
    this.app = app
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
