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

  handleAuth = (req: Request, action: string, resource: string) => {
    const { session } = req as {
      [key: string]: any
    }
    const username = session?.auth?.username || "Anonymous"
    const roles = session?.auth?.roles || []
    const permission = session?.auth?.can(action, resource) || {
      granted: false,
    }

    if (username === "Anonymous") throw new Exception(401, "Anonymous detected")
    if (!permission.granted)
      throw new Exception(
        403,
        `Insufficient ${roles} access to ${action} this ${resource}`
      )
    return {
      username,
      roles,
      resource,
      fields: permission.attributes,
      context: permission._.context,
    }
  }
  handleRequest: any = this.handleAuth

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
