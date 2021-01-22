import fp from "fastify-plugin"
import multipart from "fastify-multipart"
import { ssr } from "./ssr"
import { session } from "./session"
import { database } from "./database"
import { rbac } from "./rbac"
import { router } from "./router"
import { mail } from "./mail"

export const all = fp(async (instance) => {
  instance.register(session)
  instance.register(multipart)
  instance.register(database)
  instance.register(rbac)
  instance.register(mail)
  instance.register(router, { prefix: "/api" })
  instance.register(ssr)
})
