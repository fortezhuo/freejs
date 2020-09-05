import * as RawSchema from "../../schema"
import { Request, Reply, ValidationSchema } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

const Schema: ValidationSchema = RawSchema

export const insert = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 201
    const { validate } = Schema[this.name]
    try {
      const { body, auth } = this.handleRequest(req, "create")
      if (!validate(body))
        throw new Exception(400, this.name.toUpperCase(), validate.errors)

      const collection = req.database[this.dbName].get(this.name)
      const data = await collection.insert({
        ...body,
        created_at: new Date(),
        created_by: auth.username,
        updated_at: new Date(),
        updated_by: auth.username,
      })
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
