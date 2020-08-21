import * as RawSchema from "../schema"
import { Request, Reply, ValidationSchema } from "@free/server"
import { Exception, handleError, handleRequest } from "../util"

const Schema: ValidationSchema = RawSchema
export const update = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  const { validate } = Schema[name]

  try {
    const { option, q, body, loggedname } = handleRequest(req)
    if (!q) throw new Exception(400, "Parameter not found")
    if (!validate(body))
      throw new Exception(400, name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.update(
      q,
      { $set: { ...body, updated_by: loggedname, updated_at: new Date() } },
      option
    )
    reply.send({
      success: true,
      result: data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}
