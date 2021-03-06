import { Instance, Request, Reply } from "@free/server"
import { Exception } from "../util/exception"
import _upperFirst from "lodash/upperFirst"

const isDev = process.env.NODE_ENV !== "production"
const disableAuth = process.env.DISABLE_AUTH === "true"

export class BaseService {
  public name: string
  public disableAuth: boolean
  protected instance: Instance | undefined
  public auth: JSONObject | undefined
  constructor(name: string) {
    this.name = name
    this.instance = undefined
    this.auth = undefined
    this.disableAuth = disableAuth
  }
  protected onAuthenticate = (req: Request, resource: string) => {
    if (this.disableAuth && isDev) {
      this.instance?.log.warn(
        "[TESTING] Disable Authentication - Fake Tester Enabled"
      )
      this.auth = {
        username: "fake_tester",
        roles: ["Admin"],
        resource,
        fields: [],
        context: {},
      }
    } else {
      const method = req.method.toUpperCase()
      const auth = req.session.get("auth")
      const action =
        (method === "GET" || method === "POST") &&
        (req.raw.url || "").indexOf("find") >= 0
          ? "read"
          : method === "POST"
          ? "create"
          : method === "PATCH"
          ? "update"
          : method === "DELETE"
          ? "delete"
          : "undefined"
      const username = auth?.username || "Anonymous"
      const roles = auth?.roles || []
      const permission = req.rbac.can(action, resource, auth?.access || {}) || {
        granted: false,
      }

      if (username === "Anonymous")
        throw new Exception(401, "Anonymous detected")
      if (!permission.granted)
        throw new Exception(
          403,
          `Insufficient "${roles}" access to ${action} "${_upperFirst(
            resource
          )}" collection`
        )
      this.auth = {
        username,
        roles,
        resource,
        fields: permission.access.fields || [],
        context: permission.context,
      }
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
      const auth = req.session.get("auth")
      const fullname = auth?.fullname || "Anonymous"
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
  bindInstance(instance: Instance, skipAuth: boolean = false) {
    this.instance = instance
    this.instance.addHook("preValidation", async (req, reply) => {
      try {
        if (!skipAuth) {
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
