import fs from "fs"
import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { appPath } from "../../util/path"
import { resolve } from "path"
import { LogService } from "."

export const download = function (this: LogService) {
  return async (req: Request, reply: Reply) => {
    const { name } = this.onRequestHandler(req)
    if (!/(\d{10})/.test(name)) throw new Exception(400, "Invalid Name")
    reply.send(fs.createReadStream(resolve(appPath, `log/log_${name}.log`)))
  }
}
