import { observable, decorate, action } from "mobx"
import { AppStore } from "./appStore"
import { History } from "@free/core"

class BaseStore {
  history: History | undefined = undefined
  app: AppStore | undefined = undefined
  data = new Map()
  temp = new Map()
  isUpdating = false

  constructor(app: AppStore, history: History) {
    this.app = app
    this.history = history
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
  isUpdating: observable,
})

export { BaseStore, decorate, observable, action }
