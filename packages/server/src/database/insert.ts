import * as RawSchema from "../schema"
import { Request, Reply, ReplyJSON, ValidationSchema } from "@free/server"
import { Exception } from "./exception"

const Schema: ValidationSchema = RawSchema
export const insert = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 201
  const { validate } = Schema[name]
  let result: ReplyJSON = {}
  try {
    const values = {
      ...(req.body as object),
      created_at: new Date(),
      updated_at: new Date(),
    }

    if (!validate(values))
      throw new Exception(400, name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.insert(values)
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof Exception) {
      reply.statusCode = 400
      result = {
        success: false,
        errors: err.errors,
        message: err.message,
        stack: err.stack,
      }
    } else {
      throw err
    }
  } finally {
    reply.send(result)
  }
}
