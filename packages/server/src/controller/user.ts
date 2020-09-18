import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const user = new DatabaseService("user")

export const userController = async (instance: Instance) => {
  user.bindInstance(instance)
  instance.get("/user", user.findAll())
  instance.get("/user/:q", user.findOne())
  instance.get("/restore/user/:q", user.restore())
  instance.post("/user", user.save())
  instance.patch("/user/:q", user.save())
  instance.delete("/user/:q", user.remove())
}
