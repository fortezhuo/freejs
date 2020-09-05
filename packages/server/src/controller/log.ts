import { FastifyInstance } from "fastify"
import { LogService } from "../service/log"

export const logController = async (instance: FastifyInstance) => {
  const log = new LogService()
  log.bindInstance(instance)

  instance.get("/log", log.readDir())
  instance.get("/log/:name", log.download())
}
