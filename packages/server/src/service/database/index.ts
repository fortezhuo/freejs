import { id as monkID } from "monk"
import { BaseService } from "../base"
import { Request } from "@free/server"
import { findAll } from "./findAll"
import { findOne } from "./findOne"
import { remove } from "./remove"
import { restore } from "./restore"
import { save } from "./save"
import { Exception } from "../../util/exception"
import * as schema from "../../schema"
import { normalize, validate } from "../../schema/schema"

export class DatabaseService extends BaseService {
  public schema: any
  public collection: any
  public findAll: any
  public findOne: any
  public remove: any
  public restore: any
  public save: any

  constructor(name: string) {
    super(name)
    this.schema = (schema as any)[name]
    this.findAll = findAll.bind(this)
    this.findOne = findOne.bind(this)
    this.remove = remove.bind(this)
    this.restore = restore.bind(this)
    this.save = save.bind(this)
  }

  onBeforeSave = (collection: any, handler: any) => {}
  onAfterSave = (collection: any, handler: any) => {}
  onRequestHandler = (req: Request) => {
    const { params, body: rawBody } = req as {
      [key: string]: any
    }
    const { _id, _params, ...body } = rawBody || { _id: null }

    let {
      option = {},
      query = {},
      sort = {},
      field = {},
      limit = 30,
      page = 1,
    } = _params || {}

    limit = +`${limit}`

    const skip = (page - 1) * limit

    let projection: { [key: string]: number } = field

    this.disableAuth
      ? []
      : this.auth?.fields.forEach((field: string) => {
          projection[field.replace("-", "")] = field.indexOf("-") >= 0 ? 0 : 1
        })

    if (query._helper) {
      const { _helper } = query
      Object.keys(_helper).forEach((key: string) => {
        if (key === "date") {
          _helper[key].forEach((field: string) => {
            Object.keys(query[field]).forEach((operator: string) => {
              query[field][operator] = new Date(query[field][operator])
            })
          })
        }
      })
      delete query._helper
    }

    const q = params.id ? { _id: monkID(params.id) } : query

    return {
      q,
      body,
      projection,
      sort,
      limit,
      option,
      page,
      skip,
    }
  }
  onValidation(body: any) {
    const error = validate(body, this.schema)

    if (typeof error !== "boolean") {
      throw new Exception(
        400,
        `Validation Error for ${this.name.toUpperCase()}`,
        normalize(error)
      )
    }

    return true
  }
}
