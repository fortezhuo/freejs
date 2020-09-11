import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { UploadService } from "."
import { resolve } from "path"
import { appPath } from "../../util/path"
import { pipeline } from "stream"
import fs from "fs"
import util from "util"

export const store = function (this: UploadService) {
  return async (req: Request, reply: Reply) => {
    if (!req.isMultipart()) throw new Exception(400, "Request is not multipart")
    const parts = await req.files()
    const uploadDir = resolve(appPath, "./files")
    const pump = util.promisify(pipeline)
    for await (const data of parts) {
      const writeStream = fs.createWriteStream(`${uploadDir}/${data.filename}`) //File path
      await pump(data.file, writeStream)
    }
    reply.send("Data uploaded successfully")
  }
}
