import * as RawSchema from "../../schema"
import { Request, Reply, ValidationSchema } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

const Schema: ValidationSchema = RawSchema

export const save = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    const { validate } = Schema[this.name]
    const method = req?.method.toUpperCase()
    reply.statusCode = method === "PATCH" ? 200 : 201

    try {
      const handler = this.onRequestHandler(req)
      if (!validate(handler.body))
        throw new Exception(400, this.name.toUpperCase(), validate.errors)
      const collection = req.database[this.dbName].get(this.name)

      await this.onBeforeSave(collection, handler)

      const data =
        method === "PATCH"
          ? update(collection, handler)
          : create(collection, handler)

      await this.onAfterSave(collection, handler)

      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}

const create = async function (collection: any, handler: any) {
  const { body, auth } = handler
  return await collection.insert({
    ...body,
    created_at: new Date(),
    created_by: auth.username,
    updated_at: new Date(),
    updated_by: auth.username,
    readers:
      body.readers && (body.readers || []).length != 0 ? body.readers : ["*"],
    authors:
      body.authors && (body.authors || []).length != 0 ? body.authors : ["*"],
  })
}

const update = async function (collection: any, handler: any) {
  const { option, q, body, auth } = handler

  if (!q) throw new Exception(400, "Parameter not found")

  const query = {
    authors: { $exists: true, $in: auth.context.list },
    ...q,
  }

  return await collection.update(
    query,
    {
      $set: {
        ...body,
        updated_by: auth.username,
        updated_at: new Date(),
        readers:
          body.readers && (body.readers || []).length != 0
            ? body.readers
            : ["*"],
        authors:
          body.authors && (body.authors || []).length != 0
            ? body.authors
            : ["*"],
      },
    },
    option
  )
}
