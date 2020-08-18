declare module "@free/server" {
  import { FastifyRequest, FastifyReply } from "fastify"

  type GetFSOptions = (
    isProd?: boolean
  ) => {
    [key: string]: any
  }

  type LoadBanner = (isProd?: boolean) => void
  type Boot = () => Promise<void>

  interface Request extends FastifyRequest {
    db?: any
  }
  interface Reply extends FastifyReply {}
}
