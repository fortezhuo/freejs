import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { DatabaseService } from "."

export const save = function (this: DatabaseService) {
  return async (req: Request, reply: Reply) => {
    const method = req?.method.toUpperCase()
    reply.statusCode = method === "PATCH" ? 200 : 201

    try {
      const handler = this.onRequestHandler(req)

      if (this.onValidation(handler.body)) {
        const collection = req.database.get(this.name)
        await this.onBeforeSave(collection, handler)

        const data =
          method === "PATCH"
            ? await update(this.auth, collection, handler)
            : await create(this.auth, collection, handler)
        await this.onAfterSave(collection, handler)

        reply.send({
          success: true,
          result: data,
        })
      }
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}

const create = async function (auth: any, collection: any, handler: any) {
  const body = {
    ...handler.body,
    _createdAt: new Date(),
    _createdBy: auth.username,
    _updatedAt: new Date(),
    _updatedBy: auth.username,
    _docReaders:
      handler.body._docReaders && (handler.body._docReaders || []).length != 0
        ? handler.body._docReaders
        : ["*"],
    _docAuthors:
      handler.body._docAuthors && (handler.body._docAuthors || []).length != 0
        ? handler.body._docAuthors
        : ["*"],
  }

  return await collection.insert(body)
}

const update = async function (auth: any, collection: any, handler: any) {
  const { option, q, body } = handler

  if (!q) throw new Exception(400, "Parameter not found")

  const query = {
    _docAuthors: { $exists: true, $in: auth.context.list },
    ...q,
  }

  const result = await collection.update(
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

  if (result.n > 0 && result.nModified > 0 && result.ok > 0) {
    return result
  } else {
    throw new Exception(
      403,
      "You don't have access to update this document",
      result
    )
  }
}
