import { BaseStore, makeObservable, action } from "./baseStore"
import { AppStore } from "./appStore"
import * as req from "../request"

class TrashStore extends BaseStore {
  bottomSheet: any

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      loadData: action,
    })
  }

  async loadData(params: any) {
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        const res = await req.POST(`/api/trash/${id}`, {})
        this.setTemp({ value: res.data.result.data })
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }

  async deleteDocument(params: any) {
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        return await req.DELETE(`/api/trash/${id}`)
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }

  async restoreDocument(params: any) {
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        return await req.POST(`/api/trash/${id}`, {})
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }
}

export { TrashStore }
