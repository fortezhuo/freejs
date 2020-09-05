import { configACL } from "."
import { AccessControl } from "role-acl"

const acl = new AccessControl(configACL)
let test: any

console.log("acl", acl)
test = acl
  .can("Admin")
  .context({ readers: "hedi" })
  .execute("read")
  .sync()
  .on("log")
console.log("admin read log", test)
