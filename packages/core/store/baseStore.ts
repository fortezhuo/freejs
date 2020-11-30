import { observable, makeObservable, action, ObservableMap, toJS } from "mobx"
import { AppStore } from "./appStore"

class BaseStore {
  app: AppStore | undefined = undefined
  data = new ObservableMap()
  temp = new ObservableMap()
  isLoading = false
  isUpdating = false

  constructor(app: AppStore) {
    this.app = app
    makeObservable(this, {
      data: observable,
      temp: observable,
      setData: action,
      setTemp: action,
      set: action,
      isLoading: observable,
      isUpdating: observable,
    })
  }

  toJSON(map: ObservableMap) {
    return Object.fromEntries(toJS(map))
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

export { BaseStore, makeObservable, observable, action }
