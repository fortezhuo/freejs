import { FastifyInstance } from "fastify"
import { UploadService } from "../service/upload"

export const uploadController = async (instance: FastifyInstance) => {
  const upload = new UploadService()
  upload.bindInstance(instance)
  instance.get("/upload/gdrive/auth", upload.gdriveAuth())
  instance.get("/upload/gdrive/token", upload.gdriveToken())
  instance.post("/upload/gdrive", upload.gdriveStore())
  instance.post("/upload", upload.store())
}
