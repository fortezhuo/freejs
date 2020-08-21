import { Request, Reply } from "@free/server"
import { Exception } from "../util/exception"
import { handleRequest, handleError } from "../util"

export const remove = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200

  try {
    const { q, option } = handleRequest(req)
    if (!q) throw new Exception(400, "Parameter not found")
    const collection = req.database[dbName].get(name)
    const data = await collection.remove(q, option)
    reply.send({
      success: true,
      result: data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}
