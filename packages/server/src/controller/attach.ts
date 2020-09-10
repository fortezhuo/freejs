import { FastifyInstance } from "fastify"
import { AttachService } from "../service/attach"

export const attachController = async (instance: FastifyInstance) => {
  const attach = new AttachService()
  attach.bindInstance(instance)

  instance.post("/attach", attach.upload())
}
