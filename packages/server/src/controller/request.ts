import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const name = "request"
const dbService = new DatabaseService(name)

export const requestController = async (instance: Instance) => {
  dbService.bindInstance(instance)
  instance.post(`/find/${name}`, dbService.findAll())
  instance.post(`/find/${name}/:id`, dbService.findOne())
  instance.post(`/${name}`, dbService.save())
  instance.patch(`/${name}/:id`, dbService.save())
  instance.delete(`/${name}`, dbService.remove())
}
