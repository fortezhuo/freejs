import { FastifyInstance } from "fastify"
import { TrashService } from "../service/trash"

export const trashController = async (instance: FastifyInstance) => {
  const trash = new TrashService()
  trash.bindInstance(instance)

  instance.get("/trash", trash.list())
  instance.get("/trash/:name", trash.findAll())
  instance.get("/trash/:name/:q", trash.findOne())
}
