import { observable, makeObservable, action, ObservableMap, toJS } from "mobx"
import { AppStore } from "./appStore"

class BaseStore {
  app: AppStore | undefined = undefined
  data = new ObservableMap()
  temp = new ObservableMap()
  error = undefined
  fatalError = undefined
  isLoading = false
  isUpdating = false

  constructor(app: AppStore) {
    this.app = app
    makeObservable(this, {
      data: observable,
      error: observable,
      fatalError: observable,
      isLoading: observable,
      isUpdating: observable,
      temp: observable,
      clearError: action,
      setData: action,
      setTemp: action,
      set: action,
      setError: action,
    })
  }

  toJSON(map: ObservableMap) {
    return Object.fromEntries(toJS(map))
  }
  clearError = () => {
    this.set("error", undefined)
    this.set("fatalError", undefined)
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
  setError = (err: any) => {
    if (err.status && err.status === 500) {
      this.fatalError = err
    } else {
      const error = err.data ? err.data : err
      if (error.message.indexOf("Validation Error") >= 0) {
        this.error = error.errors
      } else {
        this.error = error
      }
    }
  }
}

export { BaseStore, makeObservable, observable, action }
