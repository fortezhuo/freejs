import { load } from "../app/db"
import fp from "fastify-plugin"

export const database = fp(async (instance) => {
  instance.log.info("Starting database connection ...")
  const result = await load()
  if (result.type === "error") {
    throw new Error(result.message)
  } else {
    instance.log.info(result.message)
  }
})
