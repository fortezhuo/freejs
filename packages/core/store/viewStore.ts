import { BaseStore } from "./baseStore"

class ViewStore extends BaseStore {
  bottomSheet: any
  name: string | undefined
  search: string[] | undefined
}

export { ViewStore }
