import { Request, Reply } from "@free/server"
import { DatabaseService } from "./"
import { Exception } from "../../util/exception"

export const findOne = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const collection = req.database[this.dbName].get(this.name)
      const { q, projection, auth } = this.handleRequest(req, "read")
      if (!q) throw new Exception(400, "Parameter not found")

      const query = {
        readers: { $exists: true, $in: auth.context.list },
        ...q,
      }

      const data = await collection.findOne(query, {
        projection,
      })
      reply.send({
        success: true,
        data,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
