import { observable, action, decorate } from "mobx"

class AppStore {
  logged = {}
  setLogged = (logged: {}) => {
    this.logged = logged
  }
}

decorate(AppStore, {
  logged: observable,
  setLogged: action,
})

export { AppStore }
