import { Request, Reply } from "@free/server"
import { Exception } from "../../util/exception"
import { BaseService } from "../base"
import { resolve } from "path"
import { appPath } from "../../util/path"
import stream from "stream"
import fs from "fs"
import util from "util"

const handler = async function (
  field: string,
  file: any,
  filename: string,
  encoding: string,
  mimetype: string
): Promise<void> {
  const uploadDir = resolve(appPath, "./files")
  const pipeline = util.promisify(stream.pipeline)
  const writeStream = fs.createWriteStream(`${uploadDir}/${filename}`) //File path
  try {
    await pipeline(file, writeStream)
  } catch (err) {
    console.error("Pipeline failed", err)
  }
}

export const upload = function (this: BaseService) {
  return async (req: Request, reply: Reply) => {
    if (!req.isMultipart()) throw new Exception(400, "Request is not multipart")
    const mp = await req.multipart(handler, onEnd)
    mp.on("field", function (key: any, value: any) {
      console.log("form-data", key, value)
    })
    async function onEnd(err: any) {
      if (err) {
        throw new Exception(500, err.message)
      }
      reply.code(200).send("Data uploaded successfully")
    }
  }
}
