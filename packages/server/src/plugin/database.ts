import { load } from "../app/database"
import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"

export const database = fp(async (instance: FastifyInstance) => {
  instance.log.info("Starting database connection ...")
  const result = await load()
  if (result.type === "error") {
    throw new Error(result.message)
  } else {
    instance.decorateRequest("database", result.database)
    instance.log.info(result.message)
  }
})
