import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const trash = new DatabaseService("trash")

export const trashController = async (instance: Instance) => {
  trash.bindInstance(instance)
  instance.post("/trash/all", trash.findAll())
  instance.post("/trash/restore", trash.restore())
  instance.post("/trash/:id", trash.findOne())
}
