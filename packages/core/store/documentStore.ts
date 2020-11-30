import { BaseStore, action, makeObservable } from "./baseStore"
import * as req from "../request"
import { AppStore } from "./appStore"
import { observable } from "mobx"

class DocumentStore extends BaseStore {
  name: string | undefined
  id: string = ""

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
      id: observable,
      afterEdit: action,
      afterLoad: action,
      beforeEdit: action,
      beforeLoad: action,
      clear: action,
      onLoad: action,
      onEdit: action,
      save: action,
    })
  }

  async afterEdit() {}
  async afterLoad() {}
  async beforeEdit() {}
  async beforeLoad() {}
  clear() {
    this.isLoading = false
    this.isUpdating = false
    this.data.clear()
  }
  async onLoad() {
    try {
      this.set("isLoading", true)
      this.data.clear()
      if (this.id.length === 24) {
        const res = await req.POST(`/api/${this.name}/${this.id}`, {})
        this.data.merge(res.data.result)
      }
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }
  onEdit() {}
  async save() {
    try {
      this.set("isLoading", true)
      await req.POST(`/api/${this.name}`, this.toJSON(this.data))
      return true
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }
}

export { DocumentStore }
