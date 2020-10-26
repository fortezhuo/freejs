import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const trash = new DatabaseService("deleted")

export const trashController = async (instance: Instance) => {
  trash.bindInstance(instance)
  instance.get("/trash", trash.findAll())
  instance.get("/trash/:q", trash.findOne())
  instance.post("/trash/restore/:q", trash.restore())
}
