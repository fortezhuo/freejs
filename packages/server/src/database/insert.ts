import * as RawSchema from "../schema"
import { Request, Reply, ReplyJSON, ValidationSchema } from "@free/server"
import { ValidationError } from "./error"

const Schema: ValidationSchema = RawSchema
export const insert = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 201
  const { validate } = Schema[name]
  let result: ReplyJSON = {}
  try {
    const body = {
      ...(req.body as object),
      created_at: new Date(),
      updated_at: new Date(),
    }

    if (!validate(body))
      throw new ValidationError(name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.insert(body)
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof ValidationError) {
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
