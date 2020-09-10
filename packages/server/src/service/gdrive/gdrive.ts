import { Request, Reply } from "@free/server"
import { GoogleDriveServices } from "."
import { createToken, setToken } from "../../util/gdrive"

export const gdriveSetup = function (this: GoogleDriveServices) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const result = await createToken()
      reply.send({
        success: true,
        result,
      })
    } catch (err) {
      this.onError(req, reply, err)
    }
  }
}

export const gdriveSetToken = function (this: GoogleDriveServices) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      let { query } = req as {
        [key: string]: any
      }
      const result = await setToken(query.code)
      reply.send({
        success: true,
        result,
      })
    } catch (err) {
      this.onError(req, reply, err)
    }
  }
}
