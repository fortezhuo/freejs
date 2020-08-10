import { observable, action } from "mobx"

class UIStore {
  @observable
  isMobile = false
  @action
  setMobile = (isMobile: boolean) => {
    this.isMobile = isMobile
  }

  @observable
  isDrawerOpen = false
  @action
  toggleDrawer = () => {
    this.isDrawerOpen = !this.isDrawerOpen
  }
  @action
  setDrawerOpen = (isOpen: boolean) => {
    this.isDrawerOpen = isOpen
  }
}

export default UIStore
