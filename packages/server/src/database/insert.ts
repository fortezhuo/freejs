import * as RawSchema from "../schema"
import { Request, Reply, ValidationSchema } from "@free/server"
import { Exception } from "../util/exception"
import { handleRequest, handleError } from "../util"

const Schema: ValidationSchema = RawSchema
export const insert = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 201
  const { validate } = Schema[name]
  try {
    const { body, loggedname } = handleRequest(req)
    if (!validate(body))
      throw new Exception(400, name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.insert({
      ...body,
      created_at: new Date(),
      created_by: loggedname,
      updated_at: new Date(),
      updated_by: loggedname,
    })
    reply.send({
      success: true,
      data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}
