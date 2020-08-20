import { Request, Reply, ReplyJSON } from "@free/server"

export const findAll = (name: string, dbName = "app") => async (
  req: Request,
  reply: Reply
) => {
  reply.statusCode = 200
  const collection = req.database[dbName].get(name)
  const { query } = req

  let result: ReplyJSON = {}
  let projection: { [key: string]: number } = {}
  let {
    q = "{}",
    sort = "{}",
    fields = "",
    limit = 30,
    page = 1,
  } = query as any
  q = JSON.parse(q)
  sort = JSON.parse(sort)
  limit = +`${limit}`

  if (fields !== "") {
    fields.split(",").forEach((field: string) => {
      projection[field] = 1
    })
  }

  const skip = (page - 1) * limit
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
  result = {
    success: true,
    data,
    limit,
    total,
    max,
  }

  reply.send(result)
}
