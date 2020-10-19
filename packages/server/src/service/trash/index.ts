import { id as monkID } from "monk"
import { BaseService } from "../base"
import { list } from "./list"
import { findAll } from "../database/findAll"
import { findOne } from "../database/findOne"
import { Request } from "@free/server"

export class TrashService extends BaseService {
  public dbName: string = "trash"
  public list: any
  public restore: any
  public findAll: any
  public findOne: any
  constructor() {
    super("trash")
    this.list = list.bind(this)
    this.findAll = findAll.bind(this)
    this.findOne = findOne.bind(this)
  }

  onRequestHandler = (req: Request) => {
    const { params, query, body: rawBody } = req as {
      [key: string]: any
    }
    const { _id, ...body } = rawBody || { _id: null }
    let projection: { [key: string]: number } = {}
    let q = query.q ? query.q : params.q
    let name = params.name
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
      name,
    }
  }
}
