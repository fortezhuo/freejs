import fp from "fastify-plugin"
import { RBAC } from "@free/rbac"
import { FastifyInstance } from "fastify"

export const rbac = fp(async (instance: FastifyInstance) => {
  instance.log.info("Starting Role Based Access Control ...")
  const rbac = new RBAC()
  instance.decorateRequest("rbac", null)

  instance.addHook("onRequest", (req: any, reply, next) => {
    req.rbac = rbac
    next()
  })

  return
})
