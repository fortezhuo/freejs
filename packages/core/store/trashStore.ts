import { BaseStore, makeObservable, action } from "./baseStore"
import { AppStore } from "./appStore"
import * as req from "../request"

class TrashStore extends BaseStore {
  bottomSheet: any
  search: string[] | undefined
  name = "trash"

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      loadData: action,
    })
  }

  async loadData(id: string) {
    try {
      this.set("isUpdating", true)
      if (id.length === 24) {
        const res = await req.get(`/api/trash/${id}`)
        this.setTemp({ value: res.data.result.data })
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isUpdating", false)
    }
  }
}

export { TrashStore }
