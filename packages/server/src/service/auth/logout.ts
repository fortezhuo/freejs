import { Request, Reply } from "@free/server"
import { BaseService } from "../base"

export const logout = function (this: BaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      req.session.delete()
      reply.send({
        success: true,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
