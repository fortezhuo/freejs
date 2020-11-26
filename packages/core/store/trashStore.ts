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

  async loadData(params: any) {
    const { id } = params
    try {
      this.set("isUpdating", true)
      if (id.length === 24) {
        const res = await req.GET(`/api/trash/${id}`)
        this.setTemp({ value: res.data.result.data })
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isUpdating", false)
    }
  }

  async deleteDocument(params: any) {
    const { id } = params
    try {
      this.set("isUpdating", true)
      if (id.length === 24) {
        return await req.DELETE(`/api/trash/${id}`)
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isUpdating", false)
    }
  }

  async restoreDocument(params: any) {
    const { id } = params
    try {
      this.set("isUpdating", true)
      if (id.length === 24) {
        return await req.POST(`/api/trash/restore/${id}`, {})
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isUpdating", false)
    }
  }
}

export { TrashStore }
