import { id as monkID } from "monk"
import { BaseService } from "../base"
import { Request } from "@free/server"
import { findAll } from "./findAll"
import { findOne } from "./findOne"
import { insert } from "./insert"
import { remove } from "./remove"
import { update } from "./update"

export class DatabaseService extends BaseService {
  public name: string
  public dbName: string
  public collection: any
  public findAll: any
  public findOne: any
  public insert: any
  public remove: any
  public update: any

  constructor(name: string, dbName?: string) {
    super()
    this.name = name
    this.dbName = dbName ? dbName : "app"
    this.findAll = findAll.bind(this)
    this.findOne = findOne.bind(this)
    this.insert = insert.bind(this)
    this.remove = remove.bind(this)
    this.update = update.bind(this)
  }

  handleRequest = (req: Request) => {
    this._handleRequest(req)

    const { params, query, body: rawBody, session } = req as {
      [key: string]: any
    }
    const authname = session?.auth?.username || "Anonymous"

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
      authname,
    }
  }
}
