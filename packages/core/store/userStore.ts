import { DocumentStore } from "./documentStore"
import { configACL } from "@free/env"

class UserStore extends DocumentStore {
  isForm = true
  title = "User Management"
  onEdit() {
    this.temp.set(
      "roles",
      Object.keys(configACL).map((acl) => ({ id: acl, label: acl }))
    )
  }
}

export { UserStore }
