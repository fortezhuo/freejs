import * as RawSchema from "../schema"
import { Request, Reply, ReplyJSON, ValidationSchema } from "@free/server"
import { Exception } from "./exception"

const Schema: ValidationSchema = RawSchema
export const update = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  let result: ReplyJSON = {}
  const { validate } = Schema[name]

  try {
    const { params, query } = req
    let { q } = params as any
    let { option = "{}" } = query as any
    option = JSON.parse(option)

    if (!q) throw new Exception(400, "Parameter not found")

    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { _id: req.database.id(q) }

    const { _id, ...body } = req.body as any
    const values = {
      ...body,
      updated_at: new Date(),
    }
    if (!validate(body))
      throw new Exception(400, name.toUpperCase(), validate.errors)

    const collection = req.database[dbName].get(name)
    const data = await collection.update(q, { $set: values }, option)
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof Exception) {
      reply.statusCode = err.code
      result = {
        success: false,
        message: err.message,
        stack: err.stack,
        errors: err.errors,
      }
    } else {
      throw err
    }
  } finally {
    reply.send(result)
  }
}
