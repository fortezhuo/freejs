import { Request, Reply, ReplyJSON } from "@free/server"

export const remove = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  let result: ReplyJSON = {}
  const { params } = req
  let { q } = params as any
  q =
    q.indexOf("{") >= 0 && q.indexOf("}") >= 0
      ? JSON.parse(q)
      : { id: req.database.id(q) }

  const collection = req.database[dbName].get(name)
  const data = await collection.remove(q)
  result = {
    success: true,
    data,
  }
  reply.send(result)
}
