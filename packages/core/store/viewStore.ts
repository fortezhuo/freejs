import { BaseStore } from "./baseStore"

class ViewStore extends BaseStore {
  name: string | undefined
  search: string[] | undefined
}

export { ViewStore }
