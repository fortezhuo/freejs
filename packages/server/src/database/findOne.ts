import { Request, Reply } from "@free/server"
import { Exception, handleRequest, handleError } from "../util"

export const findOne = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  try {
    reply.statusCode = 200
    const collection = req.database[dbName].get(name)
    const { q, projection } = handleRequest(req)
    if (!q) throw new Exception(400, "Parameter not found")
    const data = await collection.findOne(q, {
      projection,
    })
    reply.send({
      success: true,
      data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}
