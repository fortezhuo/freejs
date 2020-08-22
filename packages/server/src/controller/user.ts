import { Instance } from "@free/server"
import { DatabaseService } from "../service/database"

const user = new DatabaseService("user")

export const userController = async (instance: Instance) => {
  user.register(instance)
  instance.get("/user", user.findAll())
  instance.get("/user/:q", user.findOne())
  instance.post("/user", user.insert())
  instance.patch("/user/:q", user.update())
  instance.delete("/user/:q", user.remove())
}
