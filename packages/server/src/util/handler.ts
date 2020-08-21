import { id as monkID } from "monk"
import { Request, Reply } from "@free/server"
import { Exception } from "./exception"

export const handleRequest = (req: Request) => {
  const { params, query, body: rawBody, session } = req as {
    [key: string]: any
  }
  const loggedname = session?.username
  const { _id, ...body } = rawBody || { _id: null }
  let projection: { [key: string]: number } = {}
  let q = query.q ? query.q : params.q
  let { option = "{}", sort = "{}", fields = "", limit = 30, page = 1 } = query

  sort = JSON.parse(sort)
  option = JSON.parse(option)
  limit = +`${limit}`

  const skip = (page - 1) * limit

  if (q) {
    q =
      q.indexOf("{") >= 0 && q.indexOf("}") >= 0
        ? JSON.parse(q)
        : { _id: monkID(q) }
  }

  if (fields !== "") {
    fields.split(",").forEach((field: string) => {
      projection[field] = 1
    })
  }

  return {
    q,
    body,
    projection,
    sort,
    limit,
    option,
    page,
    skip,
    loggedname,
  }
}

export const handleError = (reply: Reply, err: any) => {
  if (err instanceof Exception) {
    reply.statusCode = err.statusCode
    reply.send({
      success: false,
      errors: err.errors,
      message: err.message,
      stack: err.stack,
    })
  } else {
    reply.send({
      success: false,
      message: err.message,
      stack: err.stack,
    })
    throw err
  }
}
