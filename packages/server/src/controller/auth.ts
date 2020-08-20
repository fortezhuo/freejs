import { FastifyInstance } from "fastify"
import { login, check } from "../auth"

export const authController = async (instance: FastifyInstance) => {
  instance.get("/auth", check())
  instance.post("/auth", login())
}
