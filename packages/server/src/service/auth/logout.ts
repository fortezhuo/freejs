import { Request, Reply } from "@free/server"
import { BaseService } from "../base"

export const logout = function (this: BaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      req.session.auth = undefined
      req.session.can = function () {
        return false
      }
      reply.send({
        success: true,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
