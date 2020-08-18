import * as controllers from "../controller"
import { FastifyInstance } from "fastify"

export const router = async (instance: FastifyInstance) => {
  Object.keys(controllers).forEach((name: string) => {
    const controller = (controllers as any)[name]
    instance.register(controller)
  })
}
