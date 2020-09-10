import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const remove = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const { q, option } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = {
        authors: { $exists: true, $in: this.auth?.context.list },
        ...q,
      }

      const collection = req.database[this.dbName].get(this.name)
      const data = await collection.remove(query, option)
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
