import { Request, Reply } from "@free/server"
import { DatabaseService } from "./"
import { Exception } from "../../util/exception"

export const findOne = function (this: any) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const { q, projection, name = undefined } = this.onRequestHandler(req)
      const collection = req.database[this.dbName].get(name || this.name)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = this.disableAuth
        ? q
        : {
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
