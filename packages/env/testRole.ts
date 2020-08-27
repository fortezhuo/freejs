import { configACL } from "."
import { AccessControl } from "role-acl"

const acl = new AccessControl(configACL)
let test: any

console.log("acl", acl)
test = acl.can("Admin").execute("update").sync().on("setting")
console.log("admin update log", test.granted)
