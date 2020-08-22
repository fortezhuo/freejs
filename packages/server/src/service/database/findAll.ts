import { Request, Reply } from "@free/server"
import { DatabaseService } from "./"

export const findAll = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const collection = req.database[this.dbName].get(this.name)
      const { q, projection, limit, sort, page, skip } = this.handleRequest(req)

      const data = await collection.find(q, {
        projection,
        sort,
        skip,
        limit,
      })
      const total = await collection.count(q, {
        projection: { id: 1 },
        estimate: true,
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
      this.handleError(req, reply, err)
    }
  }
}
