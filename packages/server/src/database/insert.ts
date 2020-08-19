import * as RawSchema from "../schema"
import { Request, Reply, ReplyJSON, ValidationSchema } from "@free/server"

const Schema: ValidationSchema = RawSchema
export const insert = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 201
  let result: ReplyJSON = {}
  const { validate } = Schema[name]

  const body = {
    ...(req.body as object),
    created_at: new Date(),
    updated_at: new Date(),
  }
  const isValid = validate(body)
  if (isValid) {
    const collection = req.database[dbName].get(name)
    const data = await collection.insert(body)
    result = {
      success: true,
      data,
    }
  } else {
    reply.statusCode = 400
    result = {
      success: false,
      message: `Validation Error for ${name.toUpperCase()}`,
      stack: validate.errors,
    }
  }
  reply.send(result)
}
