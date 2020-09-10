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
          ? update(this.auth, collection, handler)
          : create(this.auth, collection, handler)

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

const create = async function (auth: any, collection: any, handler: any) {
  const { body } = handler
  return await collection.insert({
    ...body,
    _createdAt: new Date(),
    _createdBy: auth.username,
    _updatedAt: new Date(),
    _updatedBy: auth.username,
    _docReaders:
      body._docReaders && (body._docReaders || []).length != 0
        ? body._docReaders
        : ["*"],
    _docAuthors:
      body._docAuthors && (body._docAuthors || []).length != 0
        ? body._docAuthors
        : ["*"],
  })
}

const update = async function (auth: any, collection: any, handler: any) {
  const { option, q, body } = handler

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
        _docAuthors:
          body._docAuthors && (body._docAuthors || []).length != 0
            ? body._docAuthors
            : ["*"],
        _docReaders:
          body._docReaders && (body._docReaders || []).length != 0
            ? body._docReaders
            : ["*"],
        _updatedBy: auth.username,
        _updatedAt: new Date(),
      },
    },
    option
  )
}
