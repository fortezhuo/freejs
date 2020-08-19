import { FastifyInstance } from "fastify"
import * as db from "../database"

export const userController = async (instance: FastifyInstance) => {
  instance.get("/user", db.findAll("user"))
  instance.get("/user/:q", db.findOne("user"))
  instance.post("/user", db.insert("user"))
}
