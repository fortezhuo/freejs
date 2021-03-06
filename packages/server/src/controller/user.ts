import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const name = "user"
const dbService = new DatabaseService(name)

export const userController = async (instance: Instance) => {
  dbService.bindInstance(instance)
  instance.post(`/find/${name}`, dbService.findAll())
  instance.post(`/find/${name}/:id`, dbService.findOne())
  instance.post(`/${name}`, dbService.save())
  instance.patch(`/${name}/:id`, dbService.save())
  instance.delete(`/${name}`, dbService.remove())
}
