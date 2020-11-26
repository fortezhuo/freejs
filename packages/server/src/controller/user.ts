import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const user = new DatabaseService("user")

export const userController = async (instance: Instance) => {
  user.bindInstance(instance)
  instance.post("/user/all", user.findAll())
  instance.post("/user/:id", user.findOne())
  instance.post("/user", user.save())
  instance.patch("/user/:id", user.save())
  instance.delete("/user/:id", user.remove())
}
