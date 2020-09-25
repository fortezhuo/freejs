import { AccessControl } from "role-acl"
import { configACL } from "@free/env"

export const acl = new AccessControl(configACL)
