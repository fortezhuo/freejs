import { FastifyInstance } from "fastify"
import { GoogleDriveServices } from "../service/gdrive"
const gdrive = new GoogleDriveServices()

export const gdriveSetup = async (instance: FastifyInstance) => {
  gdrive.bindInstance(instance)
  instance.get("/gdrive", gdrive.gdriveSetup())
  instance.get("/gdrive/token", gdrive.gdriveSetToken())
}
