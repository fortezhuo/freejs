import fs from "fs"
import dayjs from "dayjs"
import filesize from "filesize"
import { Request, Reply } from "@free/server"
import { LogService } from "."
import { appPath } from "../../util/path"
import { resolve } from "path"

const format = (time: Date) => dayjs(time).format("DD MMM YYYY HH:mm:ss")

export const readDir = function (this: LogService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      this.handleRequest(req)
      const files = await fs
        .readdirSync(resolve(appPath, "./log"))
        .filter((name) => name.indexOf(".log") > 0)
        .reverse()
        .slice(0, 10)

      const data = await Promise.all(
        files.map(async (file) => {
          const { mtime, size } = await fs.promises.stat(`log/${file}`)
          return {
            name: file.replace(/log_|.log/g, ""),
            mtime: format(mtime),
            size: filesize(size),
          }
        })
      )
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.handleError(req, reply, err)
    }
  }
}
