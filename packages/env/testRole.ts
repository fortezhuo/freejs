import { configACL } from "."
import { AccessControl } from "role-acl"

const acl = new AccessControl(configACL)
let test: any

console.log("acl", acl)
test = acl
  .can("User")
  .context({ readers: "hedi" })
  .execute(["read", "read:own"])
  .sync()
  .on("user")
console.log("User read user", test)
