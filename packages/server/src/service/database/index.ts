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
import { normalize } from "../../schema/schema"

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
    const { params, query, body: rawBody } = req as {
      [key: string]: any
    }
    const { _id, ...body } = rawBody || { _id: null }
    let projection: { [key: string]: number } = {}
    let q = query.q ? query.q : params.q
    let {
      option = "{}",
      sort = "{}",
      fields = "",
      limit = 30,
      page = 1,
    } = query

    sort = JSON.parse(sort)
    option = JSON.parse(option)
    limit = +`${limit}`

    const skip = (page - 1) * limit

    ;(this.disableAuth
      ? []
      : (fields === "" ? [] : fields.split(",")).concat(
          this.auth?.fields[0] === "*" ? [] : this.auth?.fields
        )
    ).forEach((field: string) => {
      projection[field.replace("-", "")] = field.indexOf("-") >= 0 ? 0 : 1
    })

    if (q) {
      q =
        q.indexOf("{") >= 0 && q.indexOf("}") >= 0
          ? JSON.parse(q)
          : { _id: monkID(q) }
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
    }
  }
  onValidation(body: any) {
    const { error } = this.schema.validate(body, {
      abortEarly: false,
    })
    if (error)
      throw new Exception(
        400,
        `Validation Error for ${this.name.toUpperCase()}`,
        normalize(error)
      )

    return true
  }
}
