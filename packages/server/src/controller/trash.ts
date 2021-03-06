import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const name = "trash"
const dbService = new DatabaseService(name)

export const trashController = async (instance: Instance) => {
  dbService.bindInstance(instance)
  instance.post(`/find/${name}`, dbService.findAll())
  instance.post(`/find/${name}/:id`, dbService.findOne())
  instance.post(`/${name}/restore`, dbService.restore())
  instance.delete(`/${name}`, dbService.remove())
}
