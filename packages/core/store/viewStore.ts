import { BaseStore, makeObservable, action } from "./baseStore"
import { AppStore } from "./appStore"
import * as req from "../request"

class ViewStore extends BaseStore {
  bottomSheet: any
  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      loadData: action,
      deleteDocument: action,
      restoreDocument: action,
    })
  }

  async loadData(params: any) {
    const name = this.data.get("name")
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        const res = await req.POST(`/api/${name}/${id}`, {})
        this.setTemp({ value: res.data.result.data })
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }

  async deleteDocument(params: any) {
    const name = this.data.get("name")
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        return await req.DELETE(`/api/${name}/${id}`)
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }

  async restoreDocument(params: any) {
    const name = this.data.get("name")
    const { id } = params
    try {
      this.set("isLoading", true)
      if (id.length === 24) {
        return await req.POST(`/api/${name}/${id}`, {})
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }
}

export { ViewStore }
