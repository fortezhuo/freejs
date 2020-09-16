import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const remove = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const collection = req.database[this.dbName].get(this.name)
      const { q, option } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = {
        _docAuthors: { $exists: true, $in: this.auth?.context.list },
        ...q,
      }
      const data = await collection.findOne(q)

      const trashCollection = req.database[this.dbTrashName].get(this.name)
      await trashCollection.insert(data)

      const removeResult = await collection.remove(query, option)
      reply.send({
        success: true,
        result: removeResult,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
