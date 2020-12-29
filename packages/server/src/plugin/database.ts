import fp from "fastify-plugin"
import { load } from "../util/database"
import { FastifyInstance } from "fastify"

export const database = fp(async (instance: FastifyInstance) => {
  instance.log.info("Starting database connection ...")
  const result: any = await load()
  instance.decorateRequest("database", null)

  instance.addHook("onRequest", (req: any, reply, next) => {
    req.database = result.database
    next()
  })

  instance.addHook("onClose", (instance: any, done) => {
    instance.database.close()
    done()
  })
  instance.log.info(result.message)
  return
})
