type JSONObject = {
  [key: string]: any
}
interface VoidFunction {
  (...args): void | React.Dispatch
}
declare var FREE_NODE_ENV: string
declare var FREE_STAMP: string
declare var window: any

declare module "*.jpg"
declare module "*.png"
declare module "simple-ldap-search" {}

declare module "@free/server" {
  import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"

  // controller
  type Instance = FastifyInstance
  type Reply = FastifyReply
  interface Request extends FastifyRequest {
    database?: any
    mail?: any
    rbac?: any
  }
}
