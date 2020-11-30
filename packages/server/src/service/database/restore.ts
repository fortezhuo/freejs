import { id as monkID } from "monk"
import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const restore = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const trash = req.database.get("trash")
      const { q } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")
      const query = this.disableAuth
        ? q
        : {
            _docAuthors: { $exists: true, $in: this.auth?.context.list },
            ...q,
          }

      let result = []
      const queue = await trash.find(query, {})

      if (queue) {
        for await (let selected of queue) {
          const collection = req.database.get(selected._deletedFrom)
          if (await collection.insert(selected.data)) {
            if (await trash.remove({ _id: monkID(selected._id) })) {
              result.push(selected._id)
            }
          } else {
            throw new Exception(400, "Restore failed")
          }
        }

        reply.send({
          success: true,
          result: result,
        })
      } else {
        throw new Exception(400, "No data found")
      }
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
