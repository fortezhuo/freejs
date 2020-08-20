import { Request, Reply, ReplyJSON } from "@free/server"
import { DatabaseError } from "./error"

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

    if (!q) throw new DatabaseError("Parameter not found")

    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { id: req.database.id(q) }

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
    if (err instanceof DatabaseError) {
      reply.statusCode = 400
      result = {
        success: false,
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
