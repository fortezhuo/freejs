const monk = require("monk")
import { Request, Reply, ReplyJSON } from "@free/server"

export const findOne = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  let result: ReplyJSON = {}
  const { params, query } = req
  try {
    let { fields = "" } = query as any
    let { q } = params as any
    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { id: monk.id(q) }

    let projection: ReplyJSON = {}
    fields.split(",").forEach((field: string) => {
      projection[field] = 1
    })
    const collection = req.database[dbName].get(name)
    const data = await collection.findOne(q, {
      projection,
    })
    result = {
      success: true,
      data,
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
