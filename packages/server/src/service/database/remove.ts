import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const remove = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const collection = req.database.get(this.name)
      const trash = req.database.get("trash")
      trash.createIndex({ "$**": "text" })
      const { q, option } = this.onRequestHandler(req)
      if (!q) throw new Exception(400, "Parameter not found")

      const query = this.disableAuth
        ? q
        : {
            _docAuthors: { $exists: true, $in: this.auth?.context.list },
            ...q,
          }

      let data
      const wantDelete = await collection.findOne(query, {})

      if (wantDelete) {
        data = {
          data: wantDelete,
          _deletedAt: new Date(),
          _deletedBy: this.auth?.username,
          _deletedFrom: this.name,
          _docAuthors: ["Admin"],
          _docReaders: ["Admin"],
        }
      } else {
        throw new Exception(400, "No data found")
      }

      if (await trash.insert(data)) {
        const result = await collection.remove(query, option)
        reply.send({
          success: true,
          result,
        })
      } else {
        throw new Exception(400, "Move to Trash failed")
      }
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
