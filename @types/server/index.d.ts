declare module "@free/server" {
  import { FastifyRequest, FastifyReply } from "fastify"

  // app
  type Banner = (isProd?: boolean) => void
  type Boot = () => Promise<void>

  // controller
  interface Request extends FastifyRequest {
    database?: any
  }
  interface Reply extends FastifyReply {}

  type ReplyJSON = {
    [key: string]: any
  }
  type ValidationSchema = {
    [key: string]: any
  }
}
