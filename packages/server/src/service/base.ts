import { Instance, Request, Reply } from "@free/server"
import { Exception } from "../util/exception"

export class BaseService {
  protected name: string
  protected disableAuth: boolean
  protected instance: Instance | undefined
  protected auth: ObjectAny | undefined
  constructor(name: string) {
    this.name = name
    this.instance = undefined
    this.auth = undefined
    this.disableAuth = false
  }
  protected onAuthenticate = (req: Request, resource: string) => {
    let { session, method } = req as {
      [key: string]: any
    }
    method = method.toUpperCase()
    const action =
      method === "GET"
        ? "read"
        : method === "POST"
        ? "create"
        : method === "PATCH"
        ? "update"
        : method === "DELETE"
        ? "delete"
        : "undefined"
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
    this.auth = {
      username,
      roles,
      resource,
      fields: permission.attributes,
      context: permission._.context,
    }
  }

  protected onError = (
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
      const fullname = req?.session?.auth?.fullname || "Anonymous"
      const method = req?.method
      const url = req.raw.url
      const message = `${fullname} ${method} ${url} ${err.message}`

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
  bindInstance(instance: Instance) {
    this.instance = instance
    this.instance.addHook("preValidation", async (req, reply) => {
      try {
        if (!this.disableAuth) {
          this.onAuthenticate(req, this.name)
        }
      } catch (err) {
        this.onErrorHandler(req, reply, err)
      }
    })
  }

  onErrorHandler = (
    req: Request,
    reply: Reply,
    err: any,
    logging: boolean = true
  ) => this.onError(req, reply, err, logging)
}
