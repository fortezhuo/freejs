import { FastifyInstance } from "fastify"
import { configUpload as config } from "@free/env"
import { UploadFileServices } from "../service/uploadfile"
const fastifyFileUpload = require("fastify-file-upload")
const upload = new UploadFileServices()

export const uploadController = async (instance: FastifyInstance) => {
  instance.register(fastifyFileUpload, {
    safeFileNames: true,
    preserveExtension: 10,
    useTempFiles: true,
    tempFileDir: config.local.tempdir,
    debug: process.env.NODE_ENV === "development",
  })
  upload.bindInstance(instance)
  instance.post("/upload", upload.upload())
}
