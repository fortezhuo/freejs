import { BaseStore, makeObservable, action } from "./baseStore"
import { AppStore } from "./appStore"
import * as req from "../request"

class ViewStore extends BaseStore {
  bottomSheet: any
  navigation: any
  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      loadData: action,
      deleteDocument: action,
      restoreDocument: action,
    })
  }

  async loadData(id: string) {
    const name = this.data.get("name")
    if (id.length === 24) {
      try {
        this.set("isLoading", true)
        const res = await req.POST(`/api/${name}/${id}`, {})
        this.setTemp({ value: res.data.result.data })
      } catch (err) {
        this.app?.setError(err)
      } finally {
        this.set("isLoading", false)
      }
    }
  }

  async deleteDocument(id: string) {
    const [name, selected] = this.getData("name", "selected")
    const selectedIds = id ? [id] : selected || []

    if (selectedIds.length != 0) {
      const _params = { query: { _id: { $in: selectedIds } } }
      try {
        this.set("isLoading", true)
        return await req.DELETE(`/api/${name}`, { _params })
      } catch (err) {
        this.app?.setError(err)
      } finally {
        this.set("isLoading", false)
        this.setData({ isRefresh: true, selected: undefined, page: 1 })
      }
    }
  }

  async restoreDocument(id: string) {
    const [name, selected] = this.getData("name", "selected")
    const selectedIds = id ? [id] : selected

    if (selectedIds.length != 0) {
      const _params = { query: { _id: { $in: selectedIds } } }
      try {
        this.set("isLoading", true)
        return await req.POST(`/api/${name}/restore`, { _params })
      } catch (err) {
        this.app?.setError(err)
      } finally {
        this.set("isLoading", false)
        this.setData({ isRefresh: true, selected: undefined, page: 1 })
      }
    }
  }
}

export { ViewStore }
