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

  _handleRequest = (req: Request, action: string, resource: string) => {
    const { session } = req as {
      [key: string]: any
    }
    const authname = session?.auth?.username || "Anonymous"
    const roles = session?.auth?.roles || []
    const granted = session?.can(action, resource)

    if (authname === "Anonymous") throw new Exception(401, "Anonymous detected")
    if (!granted)
      throw new Exception(
        403,
        `Insufficient ${roles} access to ${action} this ${resource}`
      )
  }
  handleRequest = (req: Request, action: string, resource: string) =>
    this._handleRequest(req, action, resource)

  _handleError = (
    req: Request,
    reply: Reply,
    err: any,
    logging: boolean = true
  ) => {
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

      if (logging) {
        this.instance.log.warn(message)
        if (code === 500) this.instance.log.error(err)
      }
    }
    reply.send({
      success: false,
      errors: err.errors,
      message: err.message,
      stack: reply.statusCode === 500 ? err.stack : undefined,
    })
  }
  handleError = (
    req: Request,
    reply: Reply,
    err: any,
    logging: boolean = true
  ) => this._handleError(req, reply, err, logging)
}
