import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const user = new DatabaseService("user")

export const userController = async (instance: Instance) => {
  user.bindInstance(instance)
  instance.post("/find/user", user.findAll())
  instance.post("/find/user/:id", user.findOne())
  instance.post("/user", user.save())
  instance.patch("/user/:id", user.save())
  instance.delete("/user", user.remove())
}
