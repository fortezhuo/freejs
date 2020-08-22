import { Request, Reply } from "@free/server"
import { DatabaseService } from "./"
import { Exception } from "../../util"

export const findOne = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const collection = req.database[this.dbName].get(this.name)
      const { q, projection } = this.handleRequest(req)
      if (!q) throw new Exception(400, "Parameter not found")
      const data = await collection.findOne(q, {
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
