import { BaseStore } from "./baseStore"

class TrashStore extends BaseStore {
  bottomSheet: any
  search: string[] | undefined
  isLoading = true
}

export { TrashStore }
