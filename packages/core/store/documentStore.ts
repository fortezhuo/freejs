import { BaseStore } from "./baseStore"
import { decorate, action } from "mobx"
import * as req from "../request"

class DocumentStore extends BaseStore {
  isForm = true
  get name() {
    return this.constructor.name.toLowerCase().replace(/store/g, "")
  }
  get id() {
    return this.app?.routerParams.id
  }
  async afterEdit() {}
  async afterLoad() {}
  async beforeEdit() {}
  async beforeLoad() {}
  async onLoad() {
    try {
      this.isLoading = true
      const res = await req.get(`/api/${this.name}/${this.id}`)
      this.data.merge(res.data.result)
    } catch (err) {
      this.app?.setError(err)
    } finally {
      this.isLoading = false
    }
  }
  onEdit() {}
}

decorate(DocumentStore, {
  afterEdit: action,
  afterLoad: action,
  beforeEdit: action,
  beforeLoad: action,
  onLoad: action,
  onEdit: action,
})
export { DocumentStore }
