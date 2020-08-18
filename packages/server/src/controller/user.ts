import { FastifyInstance } from "fastify"
import { Request, Reply } from "@free/server"

const userFind = async function (req: Request, reply: Reply) {
  const user = req.db.app.get("user")
  reply.send(await user.find({}))
}

export const userController = async (instance: FastifyInstance) => {
  instance.get("/user", userFind)
}
