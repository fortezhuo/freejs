import { Request, Reply } from "@free/server"
import { handleRequest } from "../util/handler"

export const findAll = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  const collection = req.database[dbName].get(name)
  const { q, projection, limit, sort, page, skip } = handleRequest(req)

  const data = await collection.find(q, {
    projection,
    sort,
    skip,
    limit,
  })
  const total = await collection.count(q, {
    projection: { id: 1 },
    estimate: true,
  })
  const max = Math.ceil(total / limit)

  reply.send({
    success: true,
    data,
    limit,
    page,
    total,
    max,
  })
}
