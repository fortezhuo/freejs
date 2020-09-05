import { id as monkID } from "monk"
import { BaseService } from "../base"
import { Request } from "@free/server"
import { findAll } from "./findAll"
import { findOne } from "./findOne"
import { remove } from "./remove"
import { save } from "./save"

export class DatabaseService extends BaseService {
  public name: string
  public dbName: string
  public collection: any
  public findAll: any
  public findOne: any
  public remove: any
  public save: any

  constructor(name: string, dbName?: string) {
    super()
    this.name = name
    this.dbName = dbName ? dbName : "app"
    this.findAll = findAll.bind(this)
    this.findOne = findOne.bind(this)
    this.remove = remove.bind(this)
    this.save = save.bind(this)
  }

  onBeforeSave = (collection: any, handler: any) => {}
  onAfterSave = (collection: any, handler: any) => {}

  onRequestHandler = (req: Request) => {
    const auth = this.onAuthenticate(req, this.name)

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

    ;(fields === "" ? [] : fields.split(","))
      .concat(auth.fields[0] === "*" ? [] : auth.fields)
      .forEach((field: string) => {
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
      auth,
    }
  }
}
