import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const restore = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const trash = req.database.get("trash")
      const { q, option } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const deleted = await trash.find(q)

      /*

      if (deleted) {
        const collection = req.database.get(deleted._deletedFrom)
        if (await collection.insert(deleted.data)) {
          await trash.remove(q, option)
          reply.send({
            success: true,
            result: deleted.data,
          })
        } else {
          throw new Exception(400, "Restore failed")
        }
      } else {
        throw new Exception(400, "No data found")
      }
      */
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
