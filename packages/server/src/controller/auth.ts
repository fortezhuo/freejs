import { FastifyInstance } from "fastify"
import { login } from "../database/auth"

export const userController = async (instance: FastifyInstance) => {
  instance.post("/auth", login())
}
