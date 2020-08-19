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
  try {
    const { body } = req
    const isValid = validate(body)
    if (isValid) {
      console.log("isValid", isValid)
      const data = {}
      result = {
        success: true,
        data,
      }
    } else {
      throw new Schema.Error(
        `Validate Error for ${name.toUpperCase()}`,
        validate.errors
      )
    }
  } catch (e) {
    reply.statusCode = 400
    result = {
      success: false,
      message: e.message,
      stack: e,
    }
  }

  reply.send(result)
}
