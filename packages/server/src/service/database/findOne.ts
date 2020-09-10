import { Request, Reply } from "@free/server"
import { DatabaseService } from "./"
import { Exception } from "../../util/exception"

export const findOne = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const collection = req.database[this.dbName].get(this.name)
      const { q, projection } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = {
        _docReaders: { $exists: true, $in: this.auth?.context.list },
        ...q,
      }

      const data = await collection.findOne(query, {
        projection,
      })
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
