import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const restore = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const trashCollection = req.database.get("deleted")
      const { q, option } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = {
        _docAuthors: { $exists: true, $in: this.auth?.context.list },
        ...q,
      }
      const data = await trashCollection.findOne(q)

      const collection = req.database.get(this.name)
      await collection.insert(data)

      await trashCollection.remove(query, option)

      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
