import { BaseStore } from "./baseStore"

class TrashStore extends BaseStore {
  modalFilter: any
  modalData: any
  search: string[] | undefined
  isLoading = true
}

export { TrashStore }
