import { BaseStore, makeObservable, action } from "./baseStore"
import { AppStore } from "./appStore"
import * as req from "../request"

class ViewStore extends BaseStore {
  bottomSheet: any

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      deleteDocument: action,
      loadData: action,
      loadCollection: action,
      restoreDocument: action,
    })
  }

  async loadData(id: string) {
    const name = this.data.get("name")
    if (id.length === 24) {
      try {
        this.set("isLoading", true)
        const res = await req.POST(`/api/find/${name}/${id}`, {})
        this.setTemp({ value: res.data.result.data })
      } catch (err) {
        this.setError(err)
      } finally {
        this.set("isLoading", false)
      }
    }
  }

  async loadCollection() {
    const [name, fields, page, search] = this.getData(
      "name",
      "fields",
      "page",
      "search"
    )
    const _params = { query: search, page, fields }
    try {
      this.set("isLoading", true)
      const { data } = await req.POST(`/api/find/${name}`, { _params })
      this.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
        isRefresh: undefined,
      })
    } finally {
      this.set("isLoading", false)
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
        this.setError(err)
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
        this.setError(err)
      } finally {
        this.set("isLoading", false)
        this.setData({ isRefresh: true, selected: undefined, page: 1 })
      }
    }
  }
}

export { ViewStore }
