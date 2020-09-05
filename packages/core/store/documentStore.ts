import { BaseStore } from "./baseStore"
import { decorate, action } from "mobx"

class DocumentStore extends BaseStore {
  isForm = true
  onLoad() {}
  onEdit() {}
}

decorate(DocumentStore, {
  onLoad: action,
  onEdit: action,
})
export { DocumentStore }
