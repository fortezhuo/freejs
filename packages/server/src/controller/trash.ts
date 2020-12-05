import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const trash = new DatabaseService("trash")

export const trashController = async (instance: Instance) => {
  trash.bindInstance(instance)
  instance.post("/find/trash", trash.findAll())
  instance.post("/find/trash/:id", trash.findOne())
  instance.post("/trash/restore", trash.restore())
  instance.delete("/trash", trash.remove())
}
