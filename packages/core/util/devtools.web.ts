import { getGlobal } from "../util"
import { toJS } from "mobx"

export const devtools = (store: any) => {
  const _global = getGlobal()
  _global.forte = {
    store: Object.keys(store),
    built: FREE_STAMP,
    show(name: string) {
      return toJS((store as any)[name])
    },
  }
}
