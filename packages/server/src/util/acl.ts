import { RBAC } from "@free/rbac"
import { configACL } from "@free/env"

export const acl = new RBAC(configACL)
