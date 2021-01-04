import { id as monkID } from "monk"
import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const remove = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const collection = req.database.get(this.name)
      const trash = req.database.get("trash")
      await trash.createIndex({ "$**": "text" })

      const { q } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")
      const ids = q._id.$in

      const query = this.disableAuth
        ? q
        : {
            _docAuthors: { $exists: true, $in: this.auth?.context.list },
            ...q,
          }

      let data
      let result: string[] = []
      const queue = await collection.find(query, {})
      if (queue) {
        for await (let selected of queue) {
          data =
            this.name === "trash"
              ? undefined
              : {
                  data: selected,
                  _deletedAt: new Date(),
                  _deletedBy: this.auth?.username,
                  _deletedFrom: this.name,
                  _docAuthors: ["Admin"],
                  _docReaders: ["Admin"],
                }

          if (data) {
            if (await trash.insert(data)) {
              if (await collection.remove({ _id: monkID(selected._id) })) {
                result.push(selected._id)
              }
            } else {
              throw new Exception(400, "Move to Trash failed")
            }
          } else {
            if (await collection.remove({ _id: monkID(selected._id) })) {
              result.push(selected._id)
            }
          }
        }

        if (ids.length !== result.length) {
          throw new Exception(403, "Failed to delete some documents", {
            failed: ids.filter((id: string) => result.indexOf(id) < 0),
          })
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
