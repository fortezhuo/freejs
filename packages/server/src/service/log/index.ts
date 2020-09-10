import { BaseService } from "../base"
import { download } from "./download"
import { readDir } from "./readDir"
import { Request } from "@free/server"

export class LogService extends BaseService {
  public files: any
  public readDir: any
  public download: any
  constructor() {
    super("log")
    this.readDir = readDir.bind(this)
    this.download = download.bind(this)
  }

  onRequestHandler = (req: Request) => {
    const auth = this.onAuthenticate(req, "log")
    const { params } = req as {
      [key: string]: any
    }
    return { auth, name: params.name }
  }
}
