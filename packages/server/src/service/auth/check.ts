import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { BaseService } from "../base"
export const check = function (this: BaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const data = req?.session?.auth
      if (!data) throw new Exception(401, "Authentication Failed")
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err, false)
    }
  }
}
