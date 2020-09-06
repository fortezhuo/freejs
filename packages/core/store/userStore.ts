import { DocumentStore } from "./documentStore"

class UserStore extends DocumentStore {
  isForm = true
  name = "user"
  title = "User Management"
}

export { UserStore }
