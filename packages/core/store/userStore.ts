import { DocumentStore } from "./documentStore"
import { configACL } from "@free/env"

class UserStore extends DocumentStore {
  isForm = true
  title = "User Management"
}

export { UserStore }
