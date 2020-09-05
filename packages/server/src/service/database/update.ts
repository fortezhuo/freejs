import * as RawSchema from "../../schema"
import { Request, Reply, ValidationSchema } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

const Schema: ValidationSchema = RawSchema
export const update = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    const { validate } = Schema[this.name]

    try {
      const { option, q, body, auth } = this.handleRequest(req, "update")
      if (!q) throw new Exception(400, "Parameter not found")
      if (!validate(body))
        throw new Exception(400, this.name.toUpperCase(), validate.errors)

      const collection = req.database[this.dbName].get(this.name)
      const data = await collection.update(
        q,
        {
          $set: { ...body, updated_by: auth.username, updated_at: new Date() },
        },
        option
      )
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
