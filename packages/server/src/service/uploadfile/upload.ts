import { Request, Reply } from "@free/server"
import { UploadFileServices } from "."
import { uploadFile } from "../../util/uploadfile"

export const upload = function (this: UploadFileServices) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      let { body } = req as {
        [key: string]: any
      }
      const uploadresult = await uploadFile(body.attachment, "local")
      reply.send({
        success: true,
        result: {
          upload_dir: uploadresult,
        },
      })
    } catch (err) {
      this.onError(req, reply, err)
    }
  }
}
