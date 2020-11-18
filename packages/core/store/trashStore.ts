import { BaseStore } from "./baseStore"

class TrashStore extends BaseStore {
  name: string | undefined
  search: string[] | undefined
  isLoading = true
}

export { TrashStore }
