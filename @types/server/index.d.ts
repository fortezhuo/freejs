declare module "@free/server" {
  import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"

  // app
  type Banner = (isProd?: boolean) => void
  type Boot = () => Promise<void>

  // controller
  type Instance = FastifyInstance
  type Reply = FastifyReply
  interface Request extends FastifyRequest {
    database?: any
    mail?: any
  }

  type ValidationSchema = {
    [key: string]: any
  }

  type Mail = {
    from: string
    to: string | Array<string>
    subject: string
    text: string
    html: string
  }
}

declare module "simple-ldap-search" {}

declare module "@free/upload" {
  type attachment = any
  type saveTo = string & ("local" | "gdrive")
}
