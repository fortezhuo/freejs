import { configACL } from "."
import { AccessControl } from "role-acl"

const acl = new AccessControl(configACL)
let test: any

test = acl.can("Admin").execute("update").sync().on("user")
console.log("admin update log", test.granted)
test = acl.can("DBAdmin").execute("update").sync().on("user")
console.log("dbadmin update log", test.granted)
test = acl.can(["Admin", "DBAdmin"]).execute("update").sync().on("user")
console.log("admin+dbadmin", test.granted)
