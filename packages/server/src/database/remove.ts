import { Request, Reply, ReplyJSON } from "@free/server"
import { Exception } from "./exception"

export const remove = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  let result: ReplyJSON = {}

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

    const collection = req.database[dbName].get(name)
    const data = await collection.remove(q, option)
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof Exception) {
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
