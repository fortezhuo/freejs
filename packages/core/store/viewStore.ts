import { BaseStore } from "./baseStore"

class ViewStore extends BaseStore {
  name: string | undefined
  search: string[] = []
}

export { ViewStore }
