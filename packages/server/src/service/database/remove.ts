import { Request, Reply, Instance } from "@free/server"
import { Exception } from "../../util/exception"
import { handleRequest } from "../../util"
import { DatabaseService } from "."

export const remove = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const { q, option } = handleRequest(req)
      if (!q) throw new Exception(400, "Parameter not found")
      const collection = req.database[this.dbName].get(this.name)
      const data = await collection.remove(q, option)
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
