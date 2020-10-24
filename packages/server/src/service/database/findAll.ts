import { Request, Reply } from "@free/server"
import { DatabaseService } from "."
import { TrashService } from "../trash"

export const findAll = function (this: DatabaseService | TrashService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const {
        q,
        projection,
        limit,
        sort,
        page,
        skip,
        name = undefined,
      } = this.onRequestHandler(req)
      const collection = req.database.get(name || this.name)

      const query = this.disableAuth
        ? q
        : {
            _docReaders: { $exists: true, $in: this.auth?.context.list },
            ...q,
          }

      const data = await collection.find(query, {
        projection,
        sort,
        skip,
        limit,
      })
      const total = await collection.count(query, {
        projection: { id: 1 },
        estimate: false,
      })
      const max = Math.ceil(total / limit)

      reply.send({
        success: true,
        result: data,
        limit,
        page,
        total,
        max,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}
