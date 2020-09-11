import { promises as fs } from "fs"
import { resolve } from "path"
import { appPath } from "../../util/path"
import { UploadService } from "."
import { Exception } from "../../util/exception"
import { configGDrive as config } from "@free/env"
import { Request, Reply } from "@free/server"

export const auth = function (this: UploadService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    const result = this.gapiOAuthClient.generateAuthUrl({
      access_type: "offline",
      scope: config.scope,
    })
    reply.redirect(302, result)
  }
}

export const token = function (this: UploadService) {
  const tokenPath = resolve(appPath, config.stored_token)
  const getToken = async (code: string) => {
    return new Promise((resolve, reject) => {
      this.gapiOAuthClient.getToken(code, async (err: any, token: any) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }

  return async (req: Request, reply: Reply) => {
    const code = (req.query as any)?.code
    if (!code) throw new Error("GDrive Auth Failed")
    const token = await getToken(code)
    await fs.writeFile(tokenPath, JSON.stringify(token))
    reply.send({
      message: `Token file stored at ${tokenPath}`,
      token,
    })
  }
}

export const store = function (this: UploadService) {
  let drive: any
  const tokenPath = resolve(appPath, config.stored_token)
  const uploadGDrive = async (part: any) => {
    return new Promise(async (resolve, reject) => {
      if (!drive) {
        const token = await fs.readFile(tokenPath, "utf-8")
        this.gapiOAuthClient.setCredentials(JSON.parse(token))
        drive = this.gapi.drive({ version: "v3", auth: this.gapiOAuthClient })
      }
      drive.files.create(
        {
          resource: {
            name: part.filename,
          },
          media: { mimeType: part.mimetype, body: part.file },
          fields: "id",
        },
        (err: Error, file: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(file.data.id)
          }
        }
      )
    })
  }

  return async (req: Request, reply: Reply) => {
    if (!req.isMultipart()) throw new Exception(400, "Request is not multipart")
    const parts = await req.files()
    let files = []
    for await (const part of parts) {
      const id = await uploadGDrive(part)
      files.push(id)
    }
    reply.send({ message: "Data uploaded to GDrive successfully", files })
  }
}
