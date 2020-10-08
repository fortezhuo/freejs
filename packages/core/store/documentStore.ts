import { BaseStore, action, makeObservable } from "./baseStore"
import * as req from "../request"
import { AppStore } from "./appStore"

class DocumentStore extends BaseStore {
  isForm = true
  name: string | undefined

  constructor(app: AppStore) {
    super(app)
    makeObservable(this, {
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

  get id() {
    return this.app?.routerParams.id
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
        const res = await req.get(`/api/${this.name}/${this.id}`)
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
      await req.post(`/api/${this.name}`, this.toJSON(this.data))
      return true
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.set("isLoading", false)
    }
  }
}

export { DocumentStore }
