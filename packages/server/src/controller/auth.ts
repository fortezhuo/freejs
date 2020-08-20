import { FastifyInstance } from "fastify"
import { login } from "../auth"

export const userController = async (instance: FastifyInstance) => {
  instance.post("/auth", login())
}
