import { FastifyInstance } from "fastify"
import { LogService } from "../service/log"

export const logController = async (instance: FastifyInstance) => {
  const log = new LogService()
  log.bindInstance(instance)

  instance.post("/find/log", log.readDir())
  instance.post("/log/:name", log.download())
}
