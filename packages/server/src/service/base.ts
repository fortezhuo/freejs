import { Instance, Request, Reply } from "@free/server"
import { Exception } from "../util/exception"

export class BaseService {
  protected instance: Instance | undefined
  constructor() {
    this.instance = undefined
  }
  register(instance: Instance) {
    this.instance = instance
  }
  handleError = (req: Request, reply: Reply, err: any) => {
    if (err instanceof Exception) {
      reply.statusCode = err.statusCode
    } else {
      reply.statusCode = 500
    }
    if (this.instance) {
      const code = reply.statusCode
      const username = req?.session?.auth?.username || "Anonymous"
      const method = req?.method
      const url = req.raw.url
      const message = `${username} ${method} ${url} ${err.message}`

      this.instance.log.warn(message)
      if (code === 500) this.instance.log.error(err)
    }
    reply.send({
      success: false,
      errors: err.errors,
      message: err.message,
      stack: reply.statusCode === 500 ? err.stack : undefined,
    })
  }
}
