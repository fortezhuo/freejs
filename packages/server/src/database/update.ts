import * as RawSchema from "../schema"
import { Request, Reply, ReplyJSON, ValidationSchema } from "@free/server"
import { DatabaseError, ValidationError } from "./error"

const Schema: ValidationSchema = RawSchema
export const update = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  let result: ReplyJSON = {}
  const { validate } = Schema[name]

  try {
    const { params } = req
    let { q } = params as any

    if (!q) throw new DatabaseError("Parameter not found")

    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { id: req.database.id(q) }

    const body = {
      ...(req.body as object),
      created_at: new Date(),
      updated_at: new Date(),
    }
    if (!validate(body))
      throw new ValidationError(name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.update(q, body)
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof DatabaseError) {
      reply.statusCode = 400
      result = {
        success: false,
        message: err.message,
        stack: err.stack,
      }
    } else if (err instanceof ValidationError) {
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