import { observable, decorate, action, ObservableMap } from "mobx"
import { AppStore } from "./appStore"

class BaseStore {
  isForm: boolean | undefined = false
  title: string | undefined
  name: string | undefined
  app: AppStore | undefined = undefined
  data = new ObservableMap()
  temp = new ObservableMap()
  isLoading = false
  isUpdating = false

  constructor(app: AppStore) {
    this.app = app
  }

  getData(...args: string[]) {
    return args.map((v) => this.data.get(v))
  }
  getTemp(...args: string[]) {
    return args.map((v) => this.temp.get(v))
  }
  setData(args: { [key: string]: any }) {
    Object.keys(args).forEach((key: string) => {
      this.data.set(key, args[key])
    })
  }
  setTemp(args: { [key: string]: any }) {
    Object.keys(args).forEach((key: string) => {
      this.temp.set(key, args[key])
    })
  }
  set(name: string, value: any) {
    ;(this as any)[name] = value
  }
}

decorate(BaseStore, {
  data: observable,
  temp: observable,
  isLoading: observable,
  isUpdating: observable,
})

export { BaseStore, decorate, observable, action }
