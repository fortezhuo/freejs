import { Request, Reply, ReplyJSON } from "@free/server"
import { Exception } from "./exception"

export const findOne = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  let result: ReplyJSON = {}
  try {
    reply.statusCode = 200
    const collection = req.database[dbName].get(name)
    const { params, query } = req

    let { fields = "" } = query as any
    let { q } = params as any
    let projection: { [key: string]: number } = {}

    if (!q) throw new Exception(400, "Parameter not found")

    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { _id: req.database.id(q) }

    if (fields !== "") {
      fields.split(",").forEach((field: string) => {
        projection[field] = 1
      })
    }

    const data = await collection.findOne(q, {
      projection,
    })

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
