import * as store from "../../store"
import { useHistory } from "../Router"
import { AppStore } from "../../store/appStore"
import { ListStore } from "@free/core"

export const useMerge = () => {
  const history = useHistory()
  const app = new AppStore()
  const stores: ListStore = {
    history,
    app,
  }

  Object.keys(store).map((key: string) => {
    const name = key.toLowerCase().replace("store", "")
    stores[name] = new (store as any)[key](app, history)
  })
  return stores
}
