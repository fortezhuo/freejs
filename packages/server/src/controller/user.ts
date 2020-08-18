import { FastifyInstance } from "fastify"

const userFind = async function (req: any, reply: any) {
  const user = req.db.app.get("user")
  reply.send(await user.find({}))
}

export const userController = async (instance: FastifyInstance) => {
  instance.get("/user", userFind)
}
