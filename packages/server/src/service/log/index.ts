import { BaseService } from "../base"
import { download } from "./download"
import { readDir } from "./readDir"
import { Request } from "@free/server"

export class LogService extends BaseService {
  public files: any
  public readDir: any
  public download: any
  constructor() {
    super()
    this.readDir = readDir.bind(this)
    this.download = download.bind(this)
  }

  handleRequest = (req: Request) => {
    this._handleRequest(req)
    const { params } = req as {
      [key: string]: any
    }
    return { name: params.name }
  }
}
