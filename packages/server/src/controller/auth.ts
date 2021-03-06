import { FastifyInstance } from "fastify"
import { AuthService } from "../service/auth"

export const authController = async (instance: FastifyInstance) => {
  const auth = new AuthService()
  auth.bindInstance(instance, true)

  instance.get("/auth", auth.check())
  instance.post("/auth", auth.login())
  instance.get("/auth/logout", auth.logout())
}
